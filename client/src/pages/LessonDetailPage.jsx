import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LessonContext } from '../context/LessonContext';
import { SentenceCard } from '../components/SentenceCard';
import { VocabularySection } from '../components/VocabularySection';
import { GrammarSection } from '../components/GrammarSection';
import { NightListeningPlayer } from '../components/NightListeningPlayer';
import { SleepTimerModal } from '../components/SleepTimerModal';
import { ShadowingCard } from '../components/ShadowingCard';
import { QuizCard } from '../components/QuizCard';
import { recordProgressApi } from '../services/progressService';
import { getLanguageByCodeOrName } from '../utils/languages';
import {
  BookOpen,
  Moon,
  Mic,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Volume2
} from 'lucide-react';

export const LessonDetailPage = () => {
  const { id } = useParams();
  const { currentLesson, loadLessonById } = useContext(LessonContext);

  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'night' | 'shadowing' | 'quiz'
  const [completedSentences, setCompletedSentences] = useState([]);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [sleepMinutes, setSleepMinutes] = useState(null);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState(null);

  useEffect(() => {
    if (id) {
      loadLessonById(id);
    }
  }, [id]);

  // Handle sleep timer countdown
  useEffect(() => {
    if (!sleepMinutes) {
      setSleepTimeRemaining(null);
      return;
    }
    setSleepTimeRemaining(sleepMinutes);
    const interval = setInterval(() => {
      setSleepTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSleepMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [sleepMinutes]);

  const lesson = currentLesson;

  if (!lesson) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading lesson details...</p>
      </div>
    );
  }

  const langConfig = getLanguageByCodeOrName(lesson.targetLanguage);

  const handleMarkCompleted = async (sentenceId) => {
    if (!completedSentences.includes(sentenceId)) {
      const updated = [...completedSentences, sentenceId];
      setCompletedSentences(updated);

      try {
        await recordProgressApi({
          lessonId: lesson._id,
          completedSentenceId: sentenceId,
          additionalListeningTime: 15 // seconds
        });
      } catch (err) {
        console.error('Failed to sync progress:', err);
      }
    }
  };

  return (
    <div>
      {/* Top Header & Navigation */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Generator
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{langConfig.flag}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', background: 'var(--accent-gold-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                {lesson.targetLanguage} • {lesson.level}
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
              {lesson.topic}
            </h1>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              gap: '4px'
            }}
          >
            <button
              onClick={() => setActiveTab('lesson')}
              className={`btn ${activeTab === 'lesson' ? 'btn-primary' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <BookOpen size={16} /> <span>Lesson Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('night')}
              className={`btn ${activeTab === 'night' ? 'btn-primary' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Moon size={16} /> <span>Night Mode</span>
            </button>

            <button
              onClick={() => setActiveTab('shadowing')}
              className={`btn ${activeTab === 'shadowing' ? 'btn-primary' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Mic size={16} /> <span>Shadowing</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`btn ${activeTab === 'quiz' ? 'btn-primary' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <HelpCircle size={16} /> <span>Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Main Sentence Learning Cards */}
      {activeTab === 'lesson' && (
        <div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              Sentences & Audio Pronunciation ({lesson.sentences?.length || 0})
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Completed: {completedSentences.length} / {lesson.sentences?.length || 0}
            </span>
          </div>

          {lesson.sentences?.map((sentence) => (
            <SentenceCard
              key={sentence.id}
              sentence={sentence}
              targetLanguage={lesson.targetLanguage}
              isCompleted={completedSentences.includes(sentence.id)}
              onMarkCompleted={handleMarkCompleted}
            />
          ))}

          {/* Section 13: Vocabulary Extraction */}
          <VocabularySection vocabulary={lesson.vocabulary} targetLanguage={lesson.targetLanguage} />

          {/* Section 14: Grammar Section */}
          <GrammarSection grammar={lesson.grammar} level={lesson.level} />
        </div>
      )}

      {/* TAB 2: Night Listening Mode */}
      {activeTab === 'night' && (
        <NightListeningPlayer
          lesson={lesson}
          onOpenSleepTimer={() => setIsSleepModalOpen(true)}
          sleepTimeRemaining={sleepTimeRemaining}
        />
      )}

      {/* TAB 3: Shadowing Speaking Mode */}
      {activeTab === 'shadowing' && (
        <ShadowingCard sentences={lesson.sentences} targetLanguage={lesson.targetLanguage} />
      )}

      {/* TAB 4: Practice Quiz */}
      {activeTab === 'quiz' && (
        <QuizCard
          quizQuestions={lesson.quiz}
          targetLanguage={lesson.targetLanguage}
          onSubmitQuiz={(res) => {
            recordProgressApi({
              lessonId: lesson._id,
              quizScore: res.score,
              completed: res.score >= 70
            });
          }}
        />
      )}

      {/* Sleep Timer Overlay Modal */}
      <SleepTimerModal
        isOpen={isSleepModalOpen}
        onClose={() => setIsSleepModalOpen(false)}
        onSetTimer={(mins) => setSleepMinutes(mins)}
        activeMinutes={sleepMinutes}
      />
    </div>
  );
};
