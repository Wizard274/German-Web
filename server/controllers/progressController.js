import {
  updateProgressService,
  getDashboardDataService
} from '../services/progressService.js';

export const recordProgressController = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const { lessonId, completedSentenceId, additionalListeningTime, quizScore, completed } = req.body;

    if (!lessonId) {
      return res.status(400).json({ success: false, message: 'LessonId is required' });
    }

    const progress = await updateProgressService({
      userId,
      lessonId,
      completedSentenceId,
      additionalListeningTime,
      quizScore,
      completed
    });

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardController = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const dashboardData = await getDashboardDataService(userId);
    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    next(error);
  }
};
