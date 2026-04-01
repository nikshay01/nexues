const mongoose = require('mongoose');
const { durationMinutes } = require('../utils/computedFields');

const sexualSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestampStart: { type: Date, required: true },
    timeOfDay: { type: String },
    durationMinutes: { type: Number }, // computed or manual

    sessionType: {
      type: String,
      enum: ['masturbation', 'partnered sex', 'mutual masturbation', 'oral', 'other'],
    },
    sessionGoal: { type: String },
    gapSinceLastSessionHours: { type: Number },

    triggerType: {
      type: String,
      enum: ['habit', 'boredom', 'sexual desire', 'partner interaction'],
    },
    mediumType: {
      type: String,
      enum: ['visual static', 'dynamic', 'interactive', 'digital interactive', 'none'],
    },
    pornUsed: { type: Boolean },

    arousalIntensity: { type: Number, min: 0, max: 10 },
    consciousControl: { type: Number, min: 0, max: 10 },
    erectionState: { type: Number, min: 0, max: 10 },

    edgingOccurred: { type: Boolean },
    edgingDurationMinutes: { type: Number },
    releaseOccurred: { type: Boolean },

    toyUsed: { type: Boolean },
    lubricantUsed: { type: Boolean },
    pain: { type: Boolean },
    painPoints: { type: String },

    urgeResistanceAttempts: { type: Number },

    // PRE state
    preState: {
      mood: { type: Number, min: 0, max: 10 },
      energy: { type: Number, min: 0, max: 10 },
      stress: { type: Number, min: 0, max: 10 },
      anxiety: { type: Number, min: 0, max: 10 },
      guilt: { type: Number, min: 0, max: 10 },
      brainFog: { type: Number, min: 0, max: 10 },
      mentalClarity: { type: Number, min: 0, max: 10 },
    },

    // POST state
    postState: {
      mood: { type: Number, min: 0, max: 10 },
      energy: { type: Number, min: 0, max: 10 },
      stress: { type: Number, min: 0, max: 10 },
      anxiety: { type: Number, min: 0, max: 10 },
      guilt: { type: Number, min: 0, max: 10 },
      brainFog: { type: Number, min: 0, max: 10 },
      mentalClarity: { type: Number, min: 0, max: 10 },
    },

    orgasmQuality: { type: Number, min: 0, max: 10 },
    regretLevel: { type: Number, min: 0, max: 10 },
    contextNote: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SexualSession', sexualSessionSchema);
