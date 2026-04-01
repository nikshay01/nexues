const mongoose = require('mongoose');

const habitDefinitionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 2000 },

    // Classification
    category: { type: String },
    subcategory: { type: String },
    project: { type: String },
    subproject: { type: String },
    priority: { type: Number, min: 1, max: 5, default: 3 },

    // Completion system
    completionType: {
      type: String,
      enum: ['boolean', 'duration', 'percentage', 'fraction', 'count', 'custom'],
      default: 'boolean',
    },
    targetValue: { type: Number, default: 1 },
    targetUnit: {
      type: String,
      enum: ['hours', 'minutes', 'pages', 'steps', '%', ''],
      default: '',
    },

    // Frequency
    frequency: {
      type: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', 'custom'],
        default: 'daily',
      },
      timesPerPeriod: { type: Number, default: 1 },
      customDays: [{ type: String }],
      timeBlock: {
        enabled: { type: Boolean, default: false },
        startTime: { type: String },
        endTime: { type: String },
      },
    },

    // Streak
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastLoggedDate: { type: Date },
      allowedMissesBeforeBreak: { type: Number, default: 1 },
      currentConsecutiveMisses: { type: Number, default: 0 },
    },

    // Procrastination
    procrastination: {
      enabled: { type: Boolean, default: false },
      totalMissedPeriods: { type: Number, default: 0 },
      missedDates: [{ type: Date }],
      longestMissStreak: { type: Number, default: 0 },
      currentMissStreak: { type: Number, default: 0 },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HabitDefinition', habitDefinitionSchema);
