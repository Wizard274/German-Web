import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonContext } from '../context/LessonContext';
import { CEFR_LEVELS } from '../utils/cefrHelpers';
import { CURRICULUM_TOPICS } from '../utils/topics';
import { LoadingPipeline } from '../components/LoadingPipeline';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export const CreateLessonPage = () => {
  const [level, setLevel] = useState('A1');
  const [selectedTopic, setSelectedTopic] = useState(CURRICULUM_TOPICS[0].topic);

  const { createLesson, isGenerating, pipelineProgress, error } = useContext(LessonContext);
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const lesson = await createLesson({ topic: selectedTopic, targetLanguage: 'German', level });
      if (lesson && lesson._id) {
        navigate(`/lesson/${lesson._id}`);
      }
    } catch (err) {
      console.error('Failed to create lesson:', err);
    }
  };

  if (isGenerating) {
    return <LoadingPipeline progress={pipelineProgress} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.85rem', background: 'var(--accent-gold-light)', borderRadius: '50%', marginBottom: '1rem' }}>
          <BookOpen size={32} color="var(--accent-gold)" />
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>Select a German Topic</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Choose from available curriculum topics to generate single-word German audio cards.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.2)', border: '1px solid var(--accent-rose)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', color: '#fff', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label">Select Target CEFR Level</label>
          <select
            className="form-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {CEFR_LEVELS.map((lvl) => (
              <option key={lvl.level} value={lvl.level}>
                {lvl.badge} {lvl.level} — {lvl.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label" style={{ marginBottom: '1rem' }}>Available Topics</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {CURRICULUM_TOPICS.map((item) => {
              const isSelected = selectedTopic === item.topic;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTopic(item.topic)}
                  style={{
                    background: isSelected ? 'var(--accent-gold-light)' : 'var(--bg-surface)',
                    border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? '#fff' : 'var(--text-primary)', margin: 0 }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                      {item.englishTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', justifyContent: 'center' }}
        >
          <Sparkles size={18} />
          <span>Launch "{selectedTopic}" Lesson →</span>
        </button>
      </div>
    </div>
  );
};
