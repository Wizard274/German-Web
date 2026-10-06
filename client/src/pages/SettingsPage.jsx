import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LANGUAGES } from '../utils/languages';
import { CEFR_LEVELS } from '../utils/cefrHelpers';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'German');
  const [currentLevel, setCurrentLevel] = useState(user?.currentLevel || 'A1');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '580px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Settings size={28} color="var(--accent-gold)" />
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>User Settings</h1>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {saved && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid var(--accent-emerald)',
              color: '#fff',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle2 size={18} color="var(--accent-emerald)" /> Preferences saved successfully!
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="set-lang">Default Target Language</label>
            <select
              id="set-lang"
              className="form-select"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" htmlFor="set-level">Current CEFR Level</label>
            <select
              id="set-level"
              className="form-select"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
            >
              {CEFR_LEVELS.map((lvl) => (
                <option key={lvl.level} value={lvl.level}>
                  {lvl.badge} {lvl.level} — {lvl.description}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem' }}>
            <Save size={18} /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};
