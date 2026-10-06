import mongoose from 'mongoose';

const sentenceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  targetLanguageText: { type: String, required: true },
  englishText: { type: String, required: true },
  notes: { type: String, default: '' },
  audio: {
    normal: { type: String, default: '' },
    slow: { type: String, default: '' }
  }
});

const vocabularySchema = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  pronunciation: { type: String, default: '' },
  example: { type: String, default: '' },
  audioUrl: { type: String, default: '' }
});

const grammarSchema = new mongoose.Schema({
  concept: { type: String, required: true },
  explanation: { type: String, required: true },
  example: { type: String, default: '' }
});

const quizQuestionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: {
    type: String,
    enum: ['multiple_choice', 'fill_in_the_blank', 'listening'],
    default: 'multiple_choice'
  },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, default: '' },
  audioUrl: { type: String, default: '' }
});

const lessonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true
    },
    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'A1', 'A2', 'B1', 'B2', 'C1'],
      default: 'A1'
    },
    targetLanguage: {
      type: String,
      required: true,
      default: 'German'
    },
    sentences: [sentenceSchema],
    vocabulary: [vocabularySchema],
    grammar: [grammarSchema],
    quiz: [quizQuestionSchema],
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Lesson = mongoose.model('Lesson', lessonSchema);
