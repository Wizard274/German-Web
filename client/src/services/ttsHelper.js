import { getLanguageByCodeOrName } from '../utils/languages';

let isSequencePlaying = false;

export const stopAllAudio = () => {
  isSequencePlaying = false;
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

/**
 * Single Playback for Target German Audio
 */
export const playTargetAudio = ({
  text,
  speed = 1.0,
  onEnd = () => {},
  onError = () => {}
}) => {
  stopAllAudio();

  if (!('speechSynthesis' in window)) {
    onError(new Error('Speech synthesis not supported'));
    return;
  }

  isSequencePlaying = true;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = speed;

  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(
    (v) => v.lang.startsWith('de') || v.lang.toLowerCase().includes('german')
  );
  if (germanVoice) utterance.voice = germanVoice;

  utterance.onend = () => {
    isSequencePlaying = false;
    onEnd();
  };

  utterance.onerror = (e) => {
    isSequencePlaying = false;
    onError(e);
  };

  window.speechSynthesis.speak(utterance);
};

/**
 * 100% Reliable Sequential Playback:
 * Queues German Utterance (de-DE) + English Utterance ("means <English>" en-US)
 * Browser natively transitions from German to English without audio drops or Chrome gesture blocks!
 */
export const playGermanWithMeansSequence = ({
  germanText,
  englishText,
  speed = 1.0,
  onEnd = () => {}
}) => {
  stopAllAudio();

  if (!('speechSynthesis' in window)) {
    onEnd();
    return;
  }

  isSequencePlaying = true;

  const voices = window.speechSynthesis.getVoices();

  // 1. German Utterance
  const uGerman = new SpeechSynthesisUtterance(germanText);
  uGerman.lang = 'de-DE';
  uGerman.rate = speed;
  const germanVoice = voices.find(
    (v) => v.lang.startsWith('de') || v.lang.toLowerCase().includes('german')
  );
  if (germanVoice) uGerman.voice = germanVoice;

  // 2. English Utterance ("means <englishText>")
  const uEnglish = new SpeechSynthesisUtterance(`means ${englishText}`);
  uEnglish.lang = 'en-US';
  uEnglish.rate = 1.0;
  const englishVoice = voices.find((v) => v.lang.startsWith('en'));
  if (englishVoice) uEnglish.voice = englishVoice;

  // When English utterance completes, trigger onEnd callback
  uEnglish.onend = () => {
    isSequencePlaying = false;
    onEnd();
  };

  uEnglish.onerror = () => {
    isSequencePlaying = false;
    onEnd();
  };

  uGerman.onerror = () => {
    // If German fails, fallback to English
    if (isSequencePlaying) {
      window.speechSynthesis.speak(uEnglish);
    }
  };

  // Queue both utterances sequentially
  window.speechSynthesis.speak(uGerman);
  window.speechSynthesis.speak(uEnglish);
};
