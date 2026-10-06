import React, { createContext, useState, useRef } from 'react';
import { playTargetAudio, playGermanWithMeansSequence, stopAllAudio } from '../services/ttsHelper';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [activeMode, setActiveMode] = useState('normal'); // 'normal' | 'slow' | 'repeat'
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.5, 0.75, 1.0, 1.25, 1.5
  const [repeatCount, setRepeatCount] = useState(1); // 1, 2, 3, 5
  const [pauseDuration, setPauseDuration] = useState(2); // seconds between sentences

  const timerRef = useRef(null);

  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    stopAllAudio();
    setIsPlaying(false);
    setActiveSentenceId(null);
  };

  const playSentence = ({ id, text, audioUrl = '', speed, onEnd }) => {
    stop();
    setIsPlaying(true);
    setActiveSentenceId(id);

    const actualSpeed = speed !== undefined ? speed : playbackSpeed;
    setActiveMode(actualSpeed < 1.0 ? 'slow' : 'normal');

    playTargetAudio({
      text,
      audioUrl,
      speed: actualSpeed,
      onEnd: () => {
        setIsPlaying(false);
        setActiveSentenceId(null);
        if (onEnd) onEnd();
      },
      onError: () => {
        setIsPlaying(false);
        setActiveSentenceId(null);
      }
    });
  };

  /**
   * Sequence: German MP3 -> "means" English MP3
   * Repeats `repeatCount` times
   */
  const repeatSentence = ({ id, text, englishText = '', audioUrl = '', meansAudioUrl = '', count, onComplete }) => {
    stop();
    setIsPlaying(true);
    setActiveSentenceId(id);
    setActiveMode('repeat');

    const totalRepeats = count !== undefined ? count : repeatCount;
    let currentIteration = 0;

    const runIteration = () => {
      currentIteration++;
      playGermanWithMeansSequence({
        germanText: text,
        englishText: englishText || 'this term',
        germanAudioUrl: audioUrl,
        meansAudioUrl: meansAudioUrl,
        speed: playbackSpeed,
        onEnd: () => {
          if (currentIteration < totalRepeats) {
            timerRef.current = setTimeout(() => {
              runIteration();
            }, pauseDuration * 1000);
          } else {
            setIsPlaying(false);
            setActiveSentenceId(null);
            if (onComplete) onComplete();
          }
        }
      });
    };

    runIteration();
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        activeSentenceId,
        activeMode,
        playbackSpeed,
        setPlaybackSpeed,
        repeatCount,
        setRepeatCount,
        pauseDuration,
        setPauseDuration,
        playSentence,
        repeatSentence,
        stopAudio: stop
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
