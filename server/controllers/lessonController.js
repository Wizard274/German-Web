import {
  createLessonPipeline,
  getLessonByIdService,
  getAllLessonsService,
  deleteLessonService
} from '../services/lessonService.js';

export const generateLessonController = async (req, res, next) => {
  try {
    const { topic, targetLanguage, level } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Topic is required'
      });
    }

    const lesson = await createLessonPipeline({
      topic,
      targetLanguage,
      level,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Lesson generated successfully 🎉',
      lesson
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLessonsController = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const lessons = await getAllLessonsService(userId);
    res.json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await getLessonByIdService(id);
    res.json({
      success: true,
      lesson
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLessonController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    await deleteLessonService(id, userId);
    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
