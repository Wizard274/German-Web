import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LessonContext } from '../context/LessonContext';
import { getDashboardApi } from '../services/progressService';
import { ProgressBar } from '../components/ProgressBar';
import { getLanguageByCodeOrName } from '../utils/languages';
import {
  Sparkles,
  BookOpen,
  Headphones,
  Flame,
  Award,
  PlusCircle,
  Play,
  ArrowRight,
  BarChart2
} from 'lucide-react';

export const DashboardPage = () => {
  const { lessons, fetchLessons } = useContext(LessonContext);
  const [dashboardData, setDashboardData] = useState({
    targetLanguage: 'German',
    level: 'A1',
    progressPercent: 80,
    lessonsCompleted: 24,
    formattedListeningTime: '8h 35m',
    vocabularyCount: 420,
    streakDays: 12
  });

  useEffect(() => {
    fetchLessons();
    const loadDashboard = async () => {
      try {
        const res = await getDashboardApi();
        if (res.dashboard) setDashboardData(res.dashboard);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };
    loadDashboard();
  }, []);

  const langConfig = getLanguageByCodeOrName(dashboardData.targetLanguage || 'German');

  return (
    <div>
      {/* Dashboard Top Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
          border: '1px solid var(--border-active)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{langConfig.flag}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
                {dashboardData.targetLanguage} Language Learning
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Track your daily listening minutes, CEFR level progression, and speech practice.
            </p>
          </div>

          <Link to="/create" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem' }}>
            <PlusCircle size={18} />
            <span>Generate New Lesson</span>
          </Link>
        </div>

        {/* Progress Bar Component */}
        <div style={{ marginTop: '2rem' }}>
          <ProgressBar
            percent={dashboardData.progressPercent || 80}
            label={`${dashboardData.targetLanguage} ${dashboardData.level} Mastery Progress`}
            height={14}
          />
        </div>
      </div>

      {/* Stats Metric Cards (Section 16) */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'var(--accent-gold-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Award size={28} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Lessons Completed</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{dashboardData.lessonsCompleted}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Headphones size={28} color="var(--accent-indigo)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Listening Time</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{dashboardData.formattedListeningTime}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <BookOpen size={28} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Vocabulary Learned</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{dashboardData.vocabularyCount} words</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <Flame size={28} color="var(--accent-rose)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Current Daily Streak</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{dashboardData.streakDays} Days 🔥</div>
          </div>
        </div>
      </div>

      {/* Recent Generated Lessons Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Recent Learning Lessons</h3>
          <Link to="/create" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
            + Create New
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {lessons && lessons.length > 0 ? (
            lessons.map((item) => (
              <div
                key={item._id}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{getLanguageByCodeOrName(item.targetLanguage).flag}</span>
                    <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{item.topic}</strong>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                      {item.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {item.sentences?.length || 0} sentences • Audio ready
                  </div>
                </div>

                <Link to={`/lesson/${item._id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <Play size={16} /> <span>Open Lesson</span>
                </Link>
              </div>
            ))
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No lessons generated yet.</p>
              <Link to="/create" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Generate Your First Lesson
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
