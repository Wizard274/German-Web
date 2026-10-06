import { generateAudioService } from '../services/audioService.js';

export const generateAudioController = async (req, res, next) => {
  try {
    const { text, language, speed } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text parameter is required' });
    }

    const result = await generateAudioService({ text, language, speed });
    res.json({
      success: true,
      audioUrl: result.audioUrl || result
    });
  } catch (error) {
    next(error);
  }
};

export const getAudioByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      audioUrl: `/audio/${id}.mp3`
    });
  } catch (error) {
    next(error);
  }
};
