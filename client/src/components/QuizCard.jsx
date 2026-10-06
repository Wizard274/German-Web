import React, { useState, useContext } from 'react';
import { playTargetAudio } from '../services/ttsHelper';
import { Volume2, CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const QuizCard = ({ quizQuestions = [], targetLanguage = 'German', onSubmitQuiz }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No quiz questions available for this lesson.</p>
      </div>
    );
  }

  const handleSelectOption = (questionId, option) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handlePlayAudio = (q) => {
    const textToPlay = q.correctAnswer || q.question;
    playTargetAudio({
      text: textToPlay,
      language: targetLanguage,
      audioUrl: q.audioUrl || ''
    });
  };

  const handleSubmit = () => {
    let scoreCount = 0;
    const feedbackList = quizQuestions.map((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) scoreCount++;
      return {
        id: q.id,
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percent = Math.round((scoreCount / quizQuestions.length) * 100);
    const res = {
      score: percent,
      correctCount: scoreCount,
      totalQuestions: quizQuestions.length,
      feedback: feedbackList
    };

    setResultData(res);
    setSubmitted(true);
    if (onSubmitQuiz) onSubmitQuiz(res);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {quizQuestions.map((q, index) => {
        const selected = userAnswers[q.id];
        const feedback = resultData?.feedback?.find((f) => f.id === q.id);

        return (
          <div key={q.id || index} className="card">
            {/* Question Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                Question {index + 1} ({q.type ? q.type.replace(/_/g, ' ') : 'Quiz'})
              </span>
              {q.type === 'listening' && (
                <button onClick={() => handlePlayAudio(q)} className="ctrl-btn">
                  <Volume2 size={16} /> Listen Audio
                </button>
              )}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: '#fff' }}>
              {q.question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {q.options?.map((opt, optIdx) => {
                const isOptionSelected = selected === opt;
                let optionStyle = {
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                };

                if (submitted) {
                  if (opt === q.correctAnswer) {
                    optionStyle = {
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid var(--accent-emerald)',
                      color: '#fff'
                    };
                  } else if (isOptionSelected && opt !== q.correctAnswer) {
                    optionStyle = {
                      background: 'rgba(244, 63, 94, 0.2)',
                      border: '1px solid var(--accent-rose)',
                      color: '#fff'
                    };
                  }
                } else if (isOptionSelected) {
                  optionStyle = {
                    background: 'var(--accent-gold-light)',
                    border: '1px solid var(--accent-gold)',
                    color: 'var(--accent-gold)'
                  };
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(q.id, opt)}
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      ...optionStyle
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {submitted && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: feedback?.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {feedback?.isCorrect ? (
                  <CheckCircle2 size={18} color="var(--accent-emerald)" />
                ) : (
                  <XCircle size={18} color="var(--accent-rose)" />
                )}
                <span>{q.explanation || (feedback?.isCorrect ? 'Correct!' : `Correct answer: ${q.correctAnswer}`)}</span>
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '1rem' }}
        >
          Submit Quiz Answers
        </button>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Quiz Result: {resultData.score}%</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            You got {resultData.correctCount} out of {resultData.totalQuestions} questions correct!
          </p>
        </div>
      )}
    </div>
  );
};
