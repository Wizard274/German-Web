import express from 'express';
import {
  generateAudioController,
  getAudioByIdController
} from '../controllers/audioController.js';

const router = express.Router();

router.post('/generate', generateAudioController);
router.get('/:id', getAudioByIdController);

export default router;
