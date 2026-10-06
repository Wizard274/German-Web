import React from 'react';

export const ProgressBar = ({ percent = 0, label = '', height = 12, color = 'var(--accent-gold)' }) => {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
          <span>{label}</span>
          <span style={{ color: 'var(--accent-gold)' }}>{safePercent}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${safePercent}%`,
            height: '100%',
            background: color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};
