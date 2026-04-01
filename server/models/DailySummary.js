const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    overallDayRating: { type: Number, min: 0, max: 10 },

    highlights: { type: String, maxlength: 5000 },
    lowlights: { type: String, maxlength: 5000 },

    tasksCompleted: { type: Number, default: 0 },
    majorAchievements: [{ type: String }],
    habitsCompletedPercent: { type: Number, min: 0, max: 100 },

    moodAverage: { type: Number, min: 0, max: 10 },
    energyAverage: { type: Number, min: 0, max: 10 },
    stressAverage: { type: Number, min: 0, max: 10 },

    notes: { type: String, maxlength: 5000 },

    customMetrics: [
      {
        metricName: { type: String },
        value: { type: String },
        intensityOrScale: { type: Number },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Ensure one summary per user per day
dailySummarySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailySummary', dailySummarySchema);
