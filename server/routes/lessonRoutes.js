import express from 'express';
import {
  generateLessonController,
  getAllLessonsController,
  getLessonByIdController,
  deleteLessonController
} from '../controllers/lessonController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', optionalAuth, generateLessonController);
router.get('/', optionalAuth, getAllLessonsController);
router.get('/:id', optionalAuth, getLessonByIdController);
router.delete('/:id', protect, deleteLessonController);

export default router;
