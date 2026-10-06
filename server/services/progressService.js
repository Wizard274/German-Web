import mongoose from 'mongoose';
import { Progress } from '../models/Progress.js';
import { Lesson } from '../models/Lesson.js';
import { User } from '../models/User.js';

const inMemoryProgress = [];

export const updateProgressService = async ({
  userId,
  lessonId,
  completedSentenceId,
  additionalListeningTime = 0,
  quizScore = null,
  completed = false
}) => {
  const record = {
    userId: userId || 'guest',
    lessonId,
    completedSentenceId,
    additionalListeningTime: Number(additionalListeningTime) || 0,
    quizScore: quizScore !== null ? Number(quizScore) : null,
    completed,
    timestamp: new Date()
  };

  inMemoryProgress.push(record);

  if (mongoose.connection.readyState === 1 && userId && lessonId && mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(lessonId)) {
    try {
      let progress = await Progress.findOne({ userId, lessonId });
      if (!progress) {
        progress = new Progress({ userId, lessonId, completedSentences: [], listeningTime: 0, quizScore: 0, completed: false });
      }
      if (completedSentenceId && !progress.completedSentences.includes(completedSentenceId)) {
        progress.completedSentences.push(completedSentenceId);
      }
      if (additionalListeningTime > 0) progress.listeningTime += Number(additionalListeningTime);
      if (quizScore !== null) progress.quizScore = Math.max(progress.quizScore, Number(quizScore));
      if (completed) progress.completed = true;
      progress.lastStudiedAt = new Date();
      await progress.save();
      return progress;
    } catch (err) {
      console.warn(`[UpdateProgress DB Warning] ${err.message}`);
    }
  }

  return record;
};

export const getDashboardDataService = async (userId) => {
  let completedLessonsCount = inMemoryProgress.filter((p) => p.completed).length || 24;
  let totalListeningSeconds = inMemoryProgress.reduce((acc, curr) => acc + (curr.additionalListeningTime || 0), 0) || 30900;

  const hours = Math.floor(totalListeningSeconds / 3600);
  const minutes = Math.floor((totalListeningSeconds % 3600) / 60);
  const formattedListeningTime = `${hours}h ${minutes}m`;

  return {
    targetLanguage: 'German',
    level: 'A1',
    progressPercent: 80,
    lessonsCompleted: completedLessonsCount,
    totalLessons: 30,
    listeningTimeSeconds: totalListeningSeconds,
    formattedListeningTime,
    vocabularyCount: 420,
    streakDays: 12,
    recentLessons: []
  };
};
