import React from 'react';
import { Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <Headphones size={18} color="var(--accent-gold)" />
          <span><strong>LinguaAI</strong> — Spotify + Duolingo + AI Tutor</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Exclusive German 🇩🇪 → English 🇬🇧 AI Audio Tutor
        </div>
      </div>
    </footer>
  );
};
