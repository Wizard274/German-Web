import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import OpenAI from 'openai';
import { getLanguageConfig } from '../config/languageConfig.js';

const AUDIO_DIR = path.join(process.cwd(), 'generated-audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

let openaiClient = null;

const getOpenAIClient = () => {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openaiClient;
};

/**
 * Fetch public high-quality TTS MP3 audio using Node 24 native fetch
 */
const fetchPublicTTS = async (text, lang = 'de') => {
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`[Public TTS Error] ${error.message}`);
    return null;
  }
};

/**
 * Generate speech audio file for target language text
 */
export const generateSpeech = async ({ text, language = 'German', speed = 1.0, audioId = '' }) => {
  if (!text || text.trim() === '') {
    return { audioUrl: '' };
  }

  const cleanText = text.trim();
  const langCode = language.toLowerCase().includes('german') || language.toLowerCase().includes('de') ? 'de' : 'en';

  const hash = crypto
    .createHash('md5')
    .update(`${language}_${cleanText}_${speed}_${langCode}`)
    .digest('hex')
    .substring(0, 16);

  const filename = `${audioId ? audioId + '_' : ''}${hash}_sp${speed.toString().replace('.', '')}.mp3`;
  const filePath = path.join(AUDIO_DIR, filename);
  const publicUrl = `/audio/${filename}`;

  if (fs.existsSync(filePath)) {
    return { audioUrl: publicUrl };
  }

  const client = getOpenAIClient();

  if (client) {
    try {
      console.log(`[TTS Service OpenAI] Generating speech for: "${cleanText.substring(0, 25)}"`);
      const mp3 = await client.audio.speech.create({
        model: 'tts-1',
        voice: langCode === 'de' ? 'alloy' : 'echo',
        input: cleanText,
        speed: speed
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      return { audioUrl: publicUrl };
    } catch (error) {
      console.error(`[TTS OpenAI Error] ${error.message}`);
    }
  }

  // High-Quality Public MP3 Fetch Fallback
  try {
    const mp3Buffer = await fetchPublicTTS(cleanText, langCode);
    if (mp3Buffer && mp3Buffer.length > 500) {
      fs.writeFileSync(filePath, mp3Buffer);
      console.log(`[TTS Service Public MP3] Generated real MP3 audio file for: "${cleanText}"`);
      return { audioUrl: publicUrl };
    }
  } catch (err) {
    console.error(`[TTS Public Fetch Error] ${err.message}`);
  }

  return { audioUrl: '' };
};

/**
 * Helper to generate German MP3 audio AND English "means <translation>" MP3 audio
 */
export const generateSentenceAudioPair = async ({ text, englishText = '', language = 'German', sentenceId }) => {
  const germanRes = await generateSpeech({
    text: text,
    language: 'German',
    speed: 1.0,
    audioId: `s${sentenceId}_de`
  });

  const meansText = `means ${englishText || ''}`.trim();
  const meansRes = await generateSpeech({
    text: meansText,
    language: 'English',
    speed: 1.0,
    audioId: `s${sentenceId}_en`
  });

  return {
    normal: typeof germanRes === 'string' ? germanRes : germanRes.audioUrl,
    means: typeof meansRes === 'string' ? meansRes : meansRes.audioUrl
  };
};
