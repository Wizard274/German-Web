import React, { useState, useEffect, useRef, useContext } from 'react';
import { playGermanWithMeansSequence, stopAllAudio } from '../services/ttsHelper';
import { AudioContext } from '../context/AudioContext';
import { Play, Pause, SkipForward, SkipBack, Moon, Clock, Gauge, RefreshCw } from 'lucide-react';

export const NightListeningPlayer = ({ lesson, onOpenSleepTimer, sleepTimeRemaining }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pauseSeconds, setPauseSeconds] = useState(2);

  const { playbackSpeed, setPlaybackSpeed, repeatCount, setRepeatCount } = useContext(AudioContext);

  const sentences = lesson?.sentences || [];
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const playSentenceAtIndex = (index) => {
    clearTimer();
    stopAllAudio();

    if (!sentences || sentences.length === 0 || index >= sentences.length) {
      setIsPlaying(false);
      return;
    }

    setCurrentIndex(index);
    setIsPlaying(true);

    const curr = sentences[index];
    let iterationCount = 0;

    const runCardLoop = () => {
      iterationCount++;
      playGermanWithMeansSequence({
        germanText: curr.targetLanguageText,
        englishText: curr.englishText,
        germanAudioUrl: curr.audio?.normal || '',
        meansAudioUrl: curr.audio?.means || '',
        speed: playbackSpeed,
        onEnd: () => {
          if (iterationCount < repeatCount) {
            timerRef.current = setTimeout(() => {
              runCardLoop();
            }, 500);
          } else {
            // Move to next card
            timerRef.current = setTimeout(() => {
              const nextIdx = (index + 1) % sentences.length;
              playSentenceAtIndex(nextIdx);
            }, pauseSeconds * 1000);
          }
        }
      });
    };

    runCardLoop();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      clearTimer();
      stopAllAudio();
      setIsPlaying(false);
    } else {
      playSentenceAtIndex(currentIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % sentences.length;
    playSentenceAtIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + sentences.length) % sentences.length;
    playSentenceAtIndex(prevIdx);
  };

  useEffect(() => {
    return () => {
      clearTimer();
      stopAllAudio();
    };
  }, []);

  const activeSentence = sentences[currentIndex] || {};

  return (
    <div className="night-container">
      <div className="night-glow">
        <Moon size={56} color="var(--accent-indigo)" />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <span
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#a5b4fc',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          🇩🇪 German Night Listening Playlist
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.75rem', color: '#fff' }}>
          {lesson?.topic || 'Night Listening Session'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Sequence: German → "means" → English (Repeat: {repeatCount}x)
        </p>
      </div>

      {/* Active Card */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 1.5rem',
          maxWidth: '680px',
          margin: '0 auto 2rem auto'
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontWeight: 600 }}>
          Item {currentIndex + 1} of {sentences.length}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
          {activeSentence.targetLanguageText || 'Press play to start'}
        </div>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          {activeSentence.englishText}
        </div>
      </div>

      {/* Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.85rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={onOpenSleepTimer}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
        >
          <Clock size={16} color="var(--accent-gold)" />
          <span>{sleepTimeRemaining ? `${sleepTimeRemaining}m left` : 'Sleep Timer'}</span>
        </button>

        {/* Speed Controller */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
          <Gauge size={16} color="var(--accent-gold)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Speed:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value={0.5} style={{ background: '#1e293b' }}>0.5x</option>
            <option value={0.75} style={{ background: '#1e293b' }}>0.75x</option>
            <option value={1.0} style={{ background: '#1e293b' }}>1.0x</option>
            <option value={1.25} style={{ background: '#1e293b' }}>1.25x</option>
            <option value={1.5} style={{ background: '#1e293b' }}>1.5x</option>
          </select>
        </div>

        {/* Repeat Controller */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
          <RefreshCw size={15} color="var(--accent-indigo)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Repeat:</span>
          <select
            value={repeatCount}
            onChange={(e) => setRepeatCount(Number(e.target.value))}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value={1} style={{ background: '#1e293b' }}>1x</option>
            <option value={2} style={{ background: '#1e293b' }}>2x</option>
            <option value={3} style={{ background: '#1e293b' }}>3x</option>
            <option value={5} style={{ background: '#1e293b' }}>5x</option>
          </select>
        </div>

        <button onClick={handlePrev} className="ctrl-btn" style={{ padding: '0.85rem', borderRadius: '50%' }}>
          <SkipBack size={20} />
        </button>

        <button
          onClick={handleTogglePlay}
          className="btn btn-primary"
          style={{
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            padding: 0,
            boxShadow: '0 0 24px rgba(99, 102, 241, 0.6)'
          }}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
        </button>

        <button onClick={handleNext} className="ctrl-btn" style={{ padding: '0.85rem', borderRadius: '50%' }}>
          <SkipForward size={20} />
        </button>

        {/* Pause selector */}
        <select
          value={pauseSeconds}
          onChange={(e) => setPauseSeconds(Number(e.target.value))}
          className="form-select"
          style={{ width: 'auto', padding: '0.5rem', fontSize: '0.85rem' }}
        >
          <option value={1}>Pause: 1s</option>
          <option value={2}>Pause: 2s</option>
          <option value={3}>Pause: 3s</option>
          <option value={5}>Pause: 5s</option>
        </select>
      </div>
    </div>
  );
};
