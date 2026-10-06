import express from 'express';
import {
  recordProgressController,
  getDashboardController
} from '../controllers/progressController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, recordProgressController);
router.get('/dashboard', optionalAuth, getDashboardController);

export default router;
