import { generateQuiz } from '../services/aiService.js';
import { Lesson } from '../models/Lesson.js';
import { updateProgressService } from '../services/progressService.js';

export const generateQuizController = async (req, res, next) => {
  try {
    const { lessonId } = req.body;
    let lesson;

    if (lessonId) {
      lesson = await Lesson.findById(lessonId);
    }

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    const quiz = lesson.quiz && lesson.quiz.length > 0
      ? lesson.quiz
      : await generateQuiz(lesson.sentences, lesson.targetLanguage);

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    next(error);
  }
};

export const submitQuizController = async (req, res, next) => {
  try {
    const { lessonId, userAnswers } = req.body; // userAnswers: [{ id, answer }]
    const userId = req.user ? req.user._id : null;

    if (!lessonId || !userAnswers) {
      return res.status(400).json({ success: false, message: 'LessonId and userAnswers are required' });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    let correctCount = 0;
    const feedback = lesson.quiz.map((q) => {
      const submitted = userAnswers.find((a) => a.id === q.id);
      const isCorrect = submitted && submitted.answer === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        userAnswer: submitted ? submitted.answer : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const scorePercentage = Math.round((correctCount / Math.max(1, lesson.quiz.length)) * 100);

    if (userId) {
      await updateProgressService({
        userId,
        lessonId,
        quizScore: scorePercentage,
        completed: scorePercentage >= 70
      });
    }

    res.json({
      success: true,
      score: scorePercentage,
      correctCount,
      totalQuestions: lesson.quiz.length,
      feedback
    });
  } catch (error) {
    next(error);
  }
};
