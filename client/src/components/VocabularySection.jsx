import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { Volume2, BookOpen } from 'lucide-react';

export const VocabularySection = ({ vocabulary = [], targetLanguage = 'German' }) => {
  const { playSentence } = useContext(AudioContext);

  if (!vocabulary || vocabulary.length === 0) return null;

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <BookOpen size={20} color="var(--accent-gold)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Vocabulary Breakdown</h3>
      </div>

      <div className="grid-2">
        {vocabulary.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{item.word}</strong>
                {item.pronunciation && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    [{item.pronunciation}]
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 500, marginTop: '2px' }}>
                {item.translation}
              </div>
              {item.example && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                  "{item.example}"
                </div>
              )}
            </div>

            <button
              onClick={() =>
                playSentence({
                  id: `vocab_${idx}`,
                  text: item.word,
                  language: targetLanguage,
                  audioUrl: item.audioUrl || ''
                })
              }
              className="ctrl-btn"
              style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
              title="Pronounce word"
            >
              <Volume2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
