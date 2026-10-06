import { generateSpeech } from './ttsService.js';

export const generateAudioService = async ({ text, language = 'German', speed = 1.0 }) => {
  if (!text) throw new Error('Text parameter is required for audio generation.');
  const result = await generateSpeech({ text, language, speed });
  return result;
};
