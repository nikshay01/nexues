const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    achievedAt: { type: Date },
    note: { type: String },
  },
  { _id: true }
);

const hobbyGoalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    targetValue: { type: Number },
    targetUnit: { type: String },
    targetPeriod: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { _id: true, timestamps: true }
);

const hobbySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    category: { type: String },
    subcategory: { type: String },
    description: { type: String, maxlength: 2000 },
    intensityType: { type: String },
    dopamineType: { type: String },
    skillGrowthPossible: { type: Boolean },
    consistencyGoal: { type: String }, // daily, weekly, monthly
    currentLevel: { type: String },
    selfRatedSkill: { type: Number, min: 0, max: 10 },
    targetLevel: { type: String },

    milestones: [milestoneSchema],
    goals: [hobbyGoalSchema],

    stats: {
      totalSessions: { type: Number, default: 0 },
      totalMinutes: { type: Number, default: 0 },
      avgSessionMinutes: { type: Number, default: 0 },
      longestSessionMinutes: { type: Number, default: 0 },
      currentStreakDays: { type: Number, default: 0 },
      longestStreakDays: { type: Number, default: 0 },
      lastSessionAt: { type: Date },
      avgQualityScore: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hobby', hobbySchema);
