import React from 'react';
import { Clock, X } from 'lucide-react';

export const SleepTimerModal = ({ isOpen, onClose, onSetTimer, activeMinutes }) => {
  if (!isOpen) return null;

  const timerOptions = [10, 15, 20, 30];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={22} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Sleep Timer</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Playback will automatically stop after the selected duration. Perfect for bed-time listening.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {timerOptions.map((mins) => (
            <button
              key={mins}
              onClick={() => {
                onSetTimer(mins);
                onClose();
              }}
              className={`btn ${activeMinutes === mins ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'space-between', padding: '0.85rem 1.25rem' }}
            >
              <span>{mins} Minutes</span>
              {activeMinutes === mins && <span>Active</span>}
            </button>
          ))}

          <button
            onClick={() => {
              onSetTimer(null);
              onClose();
            }}
            className="btn btn-outline"
            style={{ marginTop: '0.5rem' }}
          >
            Turn Off Timer
          </button>
        </div>
      </div>
    </div>
  );
};
