import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonContext } from '../context/LessonContext';
import { CEFR_LEVELS } from '../utils/cefrHelpers';
import { CURRICULUM_TOPICS } from '../utils/topics';
import { LoadingPipeline } from '../components/LoadingPipeline';
import { Sparkles, Headphones, Zap, Volume2, ArrowRight, BookOpen } from 'lucide-react';

export const HomePage = () => {
  const [level, setLevel] = useState('A1');
  const { createLesson, isGenerating, pipelineProgress, error } = useContext(LessonContext);
  const navigate = useNavigate();

  const handleSelectTopic = async (topicName) => {
    try {
      const lesson = await createLesson({ topic: topicName, targetLanguage: 'German', level });
      if (lesson && lesson._id) {
        navigate(`/lesson/${lesson._id}`);
      }
    } catch (err) {
      console.error('Lesson creation failed:', err);
    }
  };

  if (isGenerating) {
    return <LoadingPipeline progress={pipelineProgress} />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem 1rem', maxWidth: '960px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent-gold-light)',
            color: 'var(--accent-gold)',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}
        >
          <Sparkles size={16} /> German 🇩🇪 → English 🇬🇧 AI Audio Tutor
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '1.25rem', color: '#fff' }}>
          Select a Topic to Start Learning <span className="brand-badge">German 🇩🇪</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Choose your level and pick any topic below. Each topic includes single-word cards, exact audio sequence (<strong style={{ color: 'var(--accent-gold)' }}>German → "means" → English</strong>), speed controller, and night listening playlist.
        </p>

        {/* Level Selection Pills */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-surface)',
            padding: '6px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '3rem'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', paddingLeft: '1rem', paddingRight: '0.5rem' }}>
            CEFR Level:
          </span>
          {CEFR_LEVELS.map((lvl) => (
            <button
              key={lvl.level}
              type="button"
              onClick={() => setLevel(lvl.level)}
              style={{
                background: level === lvl.level ? 'var(--accent-gold)' : 'transparent',
                color: level === lvl.level ? '#000' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {lvl.badge} {lvl.level} — {lvl.description}
            </button>
          ))}
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.2)',
              border: '1px solid var(--accent-rose)',
              color: '#fff',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              marginBottom: '2rem'
            }}
          >
            {error}
          </div>
        )}
      </section>

      {/* Curriculum Topic Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Available German Topics</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Click any card to launch your personalized audio lesson</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700, background: 'var(--accent-gold-light)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
            12 Curriculum Topics Available
          </span>
        </div>

        <div className="grid-3" style={{ gap: '1.25rem' }}>
          {CURRICULUM_TOPICS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectTopic(item.topic)}
              className="card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid var(--border-subtle)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      background: 'var(--bg-primary)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>
                  {item.title}
                </h3>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                  {item.englishTitle}
                </h4>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {item.description}
                </p>

                {/* Sample Word Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {item.sampleWords.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      style={{
                        background: 'var(--bg-surface)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', justifyContent: 'center' }}
              >
                <span>Start Lesson</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', marginTop: '2rem' }}>
        <div className="grid-3">
          <div className="card">
            <div style={{ background: 'var(--accent-gold-light)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Volume2 size={22} color="var(--accent-gold)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>
              Sequential Audio
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Clear sequence: German word → "means" → English translation → German word.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={22} color="var(--accent-indigo)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>
              Speed & Repeat Control
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Adjust speed (0.5x–1.5x) and repetition count (1x–3x) for optimal absorption.
            </p>
          </div>

          <div className="card">
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Headphones size={22} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>
              Night Listening Mode
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Relax and listen before sleeping with automated playlist playback and sleep timer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
