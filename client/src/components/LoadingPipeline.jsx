import React from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export const LoadingPipeline = ({ progress }) => {
  return (
    <div className="card" style={{ maxWidth: '540px', margin: '3rem auto', textAlign: 'center', padding: '2.5rem' }}>
      <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--accent-gold-light)', borderRadius: '50%', marginBottom: '1.25rem' }}>
        <Loader2 size={36} color="var(--accent-gold)" className="spin-animation" style={{ animation: 'spin 1.5s linear infinite' }} />
      </div>

      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
        Generating Your Personalized AI Lesson...
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        AI is crafting target-language sentences, native translations, vocabulary & TTS audio files.
      </p>

      {/* Checklist */}
      <div style={{ textAlign: 'left', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: progress.contentDone ? '#fff' : 'var(--text-muted)' }}>
            Lesson Content & Sentences
          </span>
          {progress.contentDone ? <CheckCircle2 size={18} color="var(--accent-emerald)" /> : <Loader2 size={16} className="spin-animation" />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: progress.translationDone ? '#fff' : 'var(--text-muted)' }}>
            Target-Language Translation
          </span>
          {progress.translationDone ? <CheckCircle2 size={18} color="var(--accent-emerald)" /> : <Loader2 size={16} className="spin-animation" />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: progress.vocabularyDone ? '#fff' : 'var(--text-muted)' }}>
            Vocabulary Extraction
          </span>
          {progress.vocabularyDone ? <CheckCircle2 size={18} color="var(--accent-emerald)" /> : <Loader2 size={16} className="spin-animation" />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: progress.grammarDone ? '#fff' : 'var(--text-muted)' }}>
            Grammar Detection Rules
          </span>
          {progress.grammarDone ? <CheckCircle2 size={18} color="var(--accent-emerald)" /> : <Loader2 size={16} className="spin-animation" />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: '#fff' }}>
            TTS Audio Synthesis ({progress.audioProgress})
          </span>
          <CheckCircle2 size={18} color="var(--accent-emerald)" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.9rem', color: progress.quizDone ? '#fff' : 'var(--text-muted)' }}>
            Practice Quiz Generation
          </span>
          {progress.quizDone ? <CheckCircle2 size={18} color="var(--accent-emerald)" /> : <Loader2 size={16} className="spin-animation" />}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
