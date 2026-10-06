import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    completedSentences: [
      {
        type: Number
      }
    ],
    listeningTime: {
      type: Number, // in seconds
      default: 0
    },
    quizScore: {
      type: Number, // percentage (0-100)
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    lastStudiedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index for user + lesson uniqueness
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);
