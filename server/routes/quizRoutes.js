import express from 'express';
import {
  generateQuizController,
  submitQuizController
} from '../controllers/quizController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', generateQuizController);
router.post('/submit', optionalAuth, submitQuizController);

export default router;
