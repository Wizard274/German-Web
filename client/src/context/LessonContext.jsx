import React, { createContext, useState, useEffect } from 'react';
import { generateLessonApi, getAllLessonsApi, getLessonByIdApi } from '../services/lessonService';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState({
    step: '',
    contentDone: false,
    translationDone: false,
    vocabularyDone: false,
    grammarDone: false,
    audioProgress: '0/0',
    quizDone: false
  });
  const [error, setError] = useState(null);

  const fetchLessons = async () => {
    try {
      const res = await getAllLessonsApi();
      if (res.lessons) setLessons(res.lessons);
    } catch (err) {
      console.error('Error fetching lessons list:', err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const createLesson = async ({ topic, targetLanguage, level }) => {
    setIsGenerating(true);
    setError(null);
    setPipelineProgress({
      step: 'Initializing pipeline...',
      contentDone: false,
      translationDone: false,
      vocabularyDone: false,
      grammarDone: false,
      audioProgress: '0/8',
      quizDone: false
    });

    try {
      // Simulate pipeline visual feedback steps
      setTimeout(() => setPipelineProgress((p) => ({ ...p, step: 'Generating English structure & AI translation...', contentDone: true, translationDone: true })), 600);
      setTimeout(() => setPipelineProgress((p) => ({ ...p, step: 'Extracting vocabulary & grammar rules...', vocabularyDone: true, grammarDone: true })), 1400);
      setTimeout(() => setPipelineProgress((p) => ({ ...p, step: 'Synthesizing pronunciation audio files (4/8)...', audioProgress: '4/8' })), 2200);
      setTimeout(() => setPipelineProgress((p) => ({ ...p, step: 'Building practice quiz & final validation...', audioProgress: '8/8', quizDone: true })), 3000);

      const res = await generateLessonApi({ topic, targetLanguage, level });
      
      if (res.lesson) {
        setCurrentLesson(res.lesson);
        fetchLessons();
        return res.lesson;
      } else {
        throw new Error('Unable to generate lesson. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unable to generate lesson. Please try again.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadLessonById = async (id) => {
    try {
      const res = await getLessonByIdApi(id);
      if (res.lesson) {
        setCurrentLesson(res.lesson);
        return res.lesson;
      }
    } catch (err) {
      console.error('Error loading lesson details:', err);
    }
  };

  return (
    <LessonContext.Provider
      value={{
        currentLesson,
        setCurrentLesson,
        lessons,
        isGenerating,
        pipelineProgress,
        error,
        createLesson,
        loadLessonById,
        fetchLessons
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
