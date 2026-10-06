import { Lesson } from '../models/Lesson.js';
import { generateLesson } from './aiService.js';
import { generateSentenceAudioPair } from './ttsService.js';
import { pMap } from '../utils/concurrency.js';
import mongoose from 'mongoose';

// Fast In-Memory Cache for smooth offline DB operation
const inMemoryLessons = new Map();

export const createLessonPipeline = async ({
  topic,
  targetLanguage = 'German',
  level = 'A1',
  userId = null
}) => {
  if (!topic || topic.trim() === '') {
    throw new Error('Please provide a valid lesson topic.');
  }

  const validLevels = ['Beginner', 'A1', 'A2', 'B1', 'B2', 'C1'];
  const formattedLevel = validLevels.includes(level) ? level : 'A1';

  console.log(`[Pipeline] Generating structured AI lesson for "${topic}" (${targetLanguage}, ${formattedLevel})...`);
  const rawLessonData = await generateLesson({
    topic,
    targetLanguage,
    level: formattedLevel
  });

  console.log(`[Pipeline] Generating target-language TTS audio with controlled concurrency...`);

  // Controlled concurrency (3-5 items at a time) for TTS generation
  const sentencesWithAudio = await pMap(
    rawLessonData.sentences || [],
    async (sentence) => {
      const audioPair = await generateSentenceAudioPair({
        text: sentence.targetLanguageText,
        language: targetLanguage,
        sentenceId: sentence.id
      });

      return {
        ...sentence,
        audio: audioPair
      };
    },
    { concurrency: 4 }
  );

  const lessonDataToSave = {
    topic: rawLessonData.topic || topic,
    level: formattedLevel,
    targetLanguage: rawLessonData.targetLanguage || targetLanguage,
    sentences: sentencesWithAudio,
    vocabulary: rawLessonData.vocabulary || [],
    grammar: rawLessonData.grammar || [],
    quiz: rawLessonData.quiz || []
  };

  const tempId = 'temp_' + Date.now();
  const transientLesson = {
    _id: tempId,
    ...lessonDataToSave,
    createdAt: new Date()
  };

  // Always store in memory for fast lookup
  inMemoryLessons.set(tempId, transientLesson);

  // If MongoDB is connected, save to DB asynchronously without blocking
  if (mongoose.connection.readyState === 1) {
    try {
      const newLesson = new Lesson(lessonDataToSave);
      const saved = await newLesson.save();
      inMemoryLessons.set(saved._id.toString(), saved.toObject());
      return saved;
    } catch (dbErr) {
      console.warn(`[Pipeline DB Warning] ${dbErr.message}. Using in-memory record.`);
    }
  }

  return transientLesson;
};

export const getLessonByIdService = async (lessonId) => {
  if (!lessonId) throw new Error('Lesson ID is required');

  // Check in-memory map first
  if (inMemoryLessons.has(lessonId)) {
    return inMemoryLessons.get(lessonId);
  }

  // Check DB if valid ObjectId and connected
  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(lessonId)) {
    try {
      const lesson = await Lesson.findById(lessonId);
      if (lesson) return lesson;
    } catch (err) {
      console.warn(`[GetLessonById DB Warning] ${err.message}`);
    }
  }

  // Fallback search in memory values
  for (const lesson of inMemoryLessons.values()) {
    if (lesson._id.toString() === lessonId.toString()) return lesson;
  }

  throw new Error('Lesson not found');
};

export const getAllLessonsService = async (userId = null) => {
  const memoryList = Array.from(inMemoryLessons.values());

  if (mongoose.connection.readyState === 1) {
    try {
      const dbLessons = await Lesson.find().sort({ createdAt: -1 }).limit(20);
      const combined = [...dbLessons, ...memoryList];
      // Deduplicate by _id
      const uniqueMap = new Map();
      combined.forEach((item) => uniqueMap.set(item._id.toString(), item));
      return Array.from(uniqueMap.values());
    } catch (err) {
      console.warn(`[GetAllLessons DB Warning] ${err.message}`);
    }
  }

  return memoryList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const deleteLessonService = async (lessonId) => {
  if (inMemoryLessons.has(lessonId)) {
    inMemoryLessons.delete(lessonId);
  }
  if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(lessonId)) {
    try {
      await Lesson.findByIdAndDelete(lessonId);
    } catch (err) {
      console.warn(`[DeleteLesson DB Warning] ${err.message}`);
    }
  }
  return { success: true };
};
