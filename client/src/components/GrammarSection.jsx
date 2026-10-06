import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

export const GrammarSection = ({ grammar = [], level = 'A1' }) => {
  if (!grammar || grammar.length === 0) return null;

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <Sparkles size={20} color="var(--accent-indigo)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Key Grammar Concepts ({level})</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {grammar.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface)',
              borderLeft: '4px solid var(--accent-indigo)',
              padding: '1.25rem',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0'
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
              {idx + 1}. {item.concept}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
              {item.explanation}
            </p>
            {item.example && (
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: 'var(--accent-gold)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Lightbulb size={14} color="var(--accent-gold)" /> Example: {item.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
