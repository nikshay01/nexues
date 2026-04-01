const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    // DAILY COMPOSITE SCORES (0–100)
    dailyWellnessScore: { type: Number, min: 0, max: 100 },
    productivityIndex: { type: Number, min: 0, max: 100 },
    spiritualScore: { type: Number, min: 0, max: 100 },
    mentalHealthScore: { type: Number, min: 0, max: 100 },
    physicalHealthScore: { type: Number, min: 0, max: 100 },
    sleepScore: { type: Number, min: 0, max: 100 },
    screenDisciplineScore: { type: Number, min: 0, max: 100 },
    hobbyGrowthScore: { type: Number, min: 0, max: 100 },
    selfControlScore: { type: Number, min: 0, max: 100 },
    dayScore: { type: Number, min: 0, max: 100 },
    dayRating: {
      type: String,
      enum: ['Elite', 'Great', 'Good', 'Average', 'Rough', 'Bad'],
    },

    // COMPONENT BREAKDOWNS
    wellnessBreakdown: {
      energyAvg: { type: Number },
      sleepQuality: { type: Number },
      moodAvg: { type: Number },
      negativeSymptomsInv: { type: Number },
      physicalStateInv: { type: Number },
      hydrationDigestion: { type: Number },
      mindfulness: { type: Number },
    },
    productivityBreakdown: {
      focus: { type: Number },
      outputQuality: { type: Number },
      goalAdherence: { type: Number },
      efficiency: { type: Number },
      mentalState: { type: Number },
      distractionControl: { type: Number },
    },
    spiritualBreakdown: {
      meditationDepth: { type: Number },
      devotionIntensity: { type: Number },
      innerPeace: { type: Number },
      stressReduction: { type: Number },
      consistencyBonus: { type: Number },
    },
    mentalHealthBreakdown: {
      moodCalm: { type: Number },
      clarityFocus: { type: Number },
      emotionalBalance: { type: Number },
      drive: { type: Number },
      fatigueInv: { type: Number },
    },
    physicalHealthBreakdown: {
      energy: { type: Number },
      painInv: { type: Number },
      recovery: { type: Number },
      digestion: { type: Number },
      respiratory: { type: Number },
      hydration: { type: Number },
      illnessInv: { type: Number },
    },
    sleepBreakdown: {
      quality: { type: Number },
      durationAccuracy: { type: Number },
      scheduleAdherence: { type: Number },
      interruptionsInv: { type: Number },
      sleepDebtInv: { type: Number },
    },
    screenDisciplineBreakdown: {
      intentionalUse: { type: Number },
      productiveRatio: { type: Number },
      timeControl: { type: Number },
      shortFormAvoidance: { type: Number },
      lateNightAvoidance: { type: Number },
      unlockDiscipline: { type: Number },
    },
    hobbyGrowthBreakdown: {
      sessionQuality: { type: Number },
      enjoyment: { type: Number },
      immersion: { type: Number },
      progress: { type: Number },
      focus: { type: Number },
      streakBonus: { type: Number },
    },
    selfControlBreakdown: {
      screenDiscipline: { type: Number },
      workDistractionControl: { type: Number },
      urgeResistance: { type: Number },
      meditationFocus: { type: Number },
      regretAvoidance: { type: Number },
      scheduleAdherence: { type: Number },
    },

    // TRENDS
    trends: {
      meditationProgress: { type: Number },
      moodTrend: { type: Number },
      sleepConsistency: { type: Number },
      bodyCompositionTrend: { type: Number },
      habitStreakScore: { type: Number },
      painTrend: { type: Number },
      nutritionScore: { type: Number },
      sexualHealthTrend: { type: Number },
    },

    // METADATA
    computedAt: { type: Date },
    dataCompletenessPercent: { type: Number, min: 0, max: 100 },
    missingSources: [{ type: String }],
  },
  { timestamps: true }
);

// One score per user per day
scoreSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Score', scoreSchema);
