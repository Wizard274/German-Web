import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { Play, Repeat, Gauge, RefreshCw } from 'lucide-react';

export const SentenceCard = ({ sentence, isCompleted = false, onMarkCompleted }) => {
  const {
    isPlaying,
    activeSentenceId,
    activeMode,
    playbackSpeed,
    setPlaybackSpeed,
    repeatCount,
    setRepeatCount,
    playSentence,
    repeatSentence
  } = useContext(AudioContext);

  const isThisPlaying = isPlaying && activeSentenceId === sentence.id;

  const handlePlayNormal = () => {
    playSentence({
      id: sentence.id,
      text: sentence.targetLanguageText,
      language: 'German',
      audioUrl: sentence.audio?.normal || '',
      speed: playbackSpeed,
      onEnd: () => {
        if (onMarkCompleted) onMarkCompleted(sentence.id);
      }
    });
  };

  const handleRepeat = () => {
    repeatSentence({
      id: sentence.id,
      text: sentence.targetLanguageText,
      englishText: sentence.englishText,
      audioUrl: sentence.audio?.normal || '',
      meansAudioUrl: sentence.audio?.means || '',
      count: repeatCount,
      onComplete: () => {
        if (onMarkCompleted) onMarkCompleted(sentence.id);
      }
    });
  };

  return (
    <div className={`sentence-card ${isThisPlaying ? 'playing-glow' : ''}`}>
      <div className="sentence-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🇩🇪</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            German
          </span>
        </div>
      </div>

      {/* Target Language Term */}
      <div className="target-text">
        {sentence.targetLanguageText}
      </div>

      {/* English Meaning Section */}
      <div className="english-text">
        <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', color: 'var(--accent-gold)', marginBottom: '2px' }}>
          📖 English Meaning
        </span>
        {sentence.englishText}
      </div>

      {/* Controls Bar */}
      <div className="card-controls">
        <button
          onClick={handlePlayNormal}
          className={`ctrl-btn ${isThisPlaying && activeMode === 'normal' ? 'active' : ''}`}
        >
          {isThisPlaying && activeMode === 'normal' ? (
            <div className="sound-wave">
              <span></span><span></span><span></span>
            </div>
          ) : (
            <Play size={16} />
          )}
          <span>Play</span>
        </button>

        <button
          onClick={handleRepeat}
          className={`ctrl-btn ${isThisPlaying && activeMode === 'repeat' ? 'active' : ''}`}
          title="Play German → means → English"
        >
          <Repeat size={16} />
          <span>Repeat German → "means" → English</span>
        </button>

        {/* Speed Controller */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-surface-elevated)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <Gauge size={15} color="var(--accent-gold)" />
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
            <option value={0.5} style={{ background: '#1e293b' }}>0.5x (Super Slow)</option>
            <option value={0.75} style={{ background: '#1e293b' }}>0.75x (Slow)</option>
            <option value={1.0} style={{ background: '#1e293b' }}>1.0x (Normal)</option>
            <option value={1.25} style={{ background: '#1e293b' }}>1.25x (Fast)</option>
            <option value={1.5} style={{ background: '#1e293b' }}>1.5x (Super Fast)</option>
          </select>
        </div>

        {/* Repeat Controller */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-surface-elevated)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <RefreshCw size={14} color="var(--accent-indigo)" />
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

        {sentence.notes && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto', fontStyle: 'italic' }}>
            💡 {sentence.notes}
          </span>
        )}
      </div>
    </div>
  );
};
