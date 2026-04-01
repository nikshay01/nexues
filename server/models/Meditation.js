const mongoose = require('mongoose');

const meditationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestampStart: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },

    type: {
      type: String,
      enum: [
        'breath', 'mantra', 'guided', 'silent', 'walking', 'body_scan',
        'mindfulness', 'spiritual', 'focused', 'movement', 'transcendental',
        'progressive_relaxation', 'loving_kindness', 'visualization',
      ],
    },
    technique: { type: String },
    posture: {
      type: String,
      enum: ['sitting', 'lying', 'walking', 'kneeling'],
    },
    environment: {
      type: String,
      enum: ['quiet', 'music', 'nature', 'noisy'],
    },
    backSupportUsed: { type: Boolean },
    musicUsed: { type: String },

    // PRE STATE
    preState: {
      stressLevel: { type: Number, min: 0, max: 10 },
      energyLevel: { type: Number, min: 0, max: 10 },
      mood: { type: Number, min: 0, max: 10 },
      mentalClarity: { type: Number, min: 0, max: 10 },
      brainFog: { type: Number, min: 0, max: 10 },
      tiredness: { type: Number, min: 0, max: 10 },
    },

    // PRACTICE METRICS
    practiceMetrics: {
      depthLevel: { type: Number, min: 0, max: 10 },
      distractionLevel: { type: Number, min: 0, max: 10 },
      focusPercentage: { type: Number, min: 0, max: 100 },
      distractionSpikesCount: { type: Number },
      sleepinessPeak: { type: Number, min: 0, max: 10 },
      mantraCount: { type: Number },
    },

    // PHYSIOLOGICAL RESPONSE
    physiologicalResponse: {
      bodyRelaxationLevel: { type: Number, min: 0, max: 10 },
      heartRateBefore: { type: Number },
      heartRateAfter: { type: Number },
    },

    // POST STATE
    postState: {
      stressLevel: { type: Number, min: 0, max: 10 },
      mentalClarity: { type: Number, min: 0, max: 10 },
      calmness: { type: Number, min: 0, max: 10 },
      energy: { type: Number, min: 0, max: 10 },
      brainFog: { type: Number, min: 0, max: 10 },
      motivation: { type: Number, min: 0, max: 10 },
    },

    // SPIRITUAL STATE
    spiritualState: {
      senseOfPresence: { type: Number, min: 0, max: 10 },
      devotionalFeeling: { type: Number, min: 0, max: 10 },
      gratitudeLevel: { type: Number, min: 0, max: 10 },
    },

    // QUALITY METRICS
    effectiveFocusMinutes: { type: Number },
    sessionQualityScore: { type: Number, min: 0, max: 10 },

    // CONTEXT
    contextNote: { type: String, maxlength: 2000 },
    location: { type: String },
    backgroundAudio: { type: String },
    sessionIntention: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meditation', meditationSchema);
