import React, { useState } from 'react';
import { playTargetAudio, stopAllAudio } from '../services/ttsHelper';
import { Headphones, Mic, ArrowRight, Volume2, CheckCircle2, RotateCcw } from 'lucide-react';

export const ShadowingCard = ({ sentences = [], targetLanguage = 'German' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState('listen'); // 'listen' | 'repeat' | 'done'
  const [isPlaying, setIsPlaying] = useState(false);

  if (!sentences || sentences.length === 0) return null;

  const currentSentence = sentences[currentIndex];

  const handleListen = () => {
    stopAllAudio();
    setIsPlaying(true);
    setStep('listen');

    playTargetAudio({
      text: currentSentence.targetLanguageText,
      language: targetLanguage,
      audioUrl: currentSentence.audio?.normal || '',
      speed: 1.0,
      onEnd: () => {
        setIsPlaying(false);
        setStep('repeat');
      },
      onError: () => {
        setIsPlaying(false);
        setStep('repeat');
      }
    });
  };

  const handleNext = () => {
    stopAllAudio();
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStep('listen');
    } else {
      setStep('done');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStep('listen');
  };

  if (step === 'done') {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <CheckCircle2 size={56} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Shadowing Session Completed! 🎉</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Great job practicing your vocal pronunciation and cadence in {targetLanguage}.
        </p>
        <button onClick={handleRestart} className="btn btn-primary">
          <RotateCcw size={18} /> Restart Shadowing Session
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '2rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
          🗣️ Shadowing & Pronunciation Practice
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {currentIndex + 1} / {sentences.length}
        </span>
      </div>

      {/* Target Sentence */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
          {currentSentence.targetLanguageText}
        </div>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          {currentSentence.englishText}
        </div>
      </div>

      {/* Step Indicator Badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: step === 'listen' ? 'var(--accent-gold-light)' : 'var(--bg-surface)',
            border: step === 'listen' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
            color: step === 'listen' ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontWeight: 600
          }}
        >
          <Headphones size={18} />
          <span>1. 🎧 Listen</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: step === 'repeat' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface)',
            border: step === 'repeat' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
            color: step === 'repeat' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontWeight: 600
          }}
        >
          <Mic size={18} />
          <span>2. 🗣️ Repeat Aloud</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            fontWeight: 600
          }}
        >
          <ArrowRight size={18} />
          <span>3. ➡️ Next</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleListen} className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem' }}>
          <Volume2 size={20} />
          <span>{isPlaying ? 'Playing Audio...' : 'Listen to Sentence'}</span>
        </button>

        <button
          onClick={handleNext}
          className="btn btn-primary"
          style={{ padding: '0.85rem 1.75rem' }}
        >
          <span>Next Sentence</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
