import React, { useState, useEffect } from 'react';
import { getDashboardApi } from '../services/progressService';
import { ProgressBar } from '../components/ProgressBar';
import { BarChart3, Clock, CheckCircle, Award, Sparkles } from 'lucide-react';

export const ProgressPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboardApi();
        if (res.dashboard) setData(res.dashboard);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>Learning Progress & Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed record of your listening sessions, quiz mastery, and vocabulary count.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>
          CEFR Level Milestones
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>German 🇩🇪 A1 Beginner Level</span>
              <span style={{ color: 'var(--accent-emerald)' }}>Completed ✓</span>
            </div>
            <ProgressBar percent={100} height={10} color="var(--accent-emerald)" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>German 🇩🇪 A2 Elementary Level</span>
              <span style={{ color: 'var(--accent-gold)' }}>80% In Progress</span>
            </div>
            <ProgressBar percent={80} height={10} color="var(--accent-gold)" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>German 🇩🇪 B1 Intermediate Level</span>
              <span style={{ color: 'var(--text-muted)' }}>Locked (25% Ready)</span>
            </div>
            <ProgressBar percent={25} height={10} color="var(--accent-indigo)" />
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
            🎧 Listening Time Stats
          </h4>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
            {data?.formattedListeningTime || '8h 35m'}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Accumulated active sentence playback and night mode listening.
          </p>
        </div>

        <div className="card">
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
            📚 Vocabulary Bank
          </h4>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            {data?.vocabularyCount || 420} words
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Words extracted across your generated AI lessons.
          </p>
        </div>
      </div>
    </div>
  );
};
