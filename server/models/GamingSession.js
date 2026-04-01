const mongoose = require('mongoose');
const { durationMinutes } = require('../utils/computedFields');

const gamingSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestampStart: { type: Date, required: true },
    timestampEnd: { type: Date },
    durationMinutes: { type: Number }, // computed

    gameName: { type: String, required: true, trim: true },
    platform: {
      type: String,
      enum: ['PC', 'Console', 'Mobile', 'VR', 'Tabletop'],
    },
    sessionType: {
      type: String,
      enum: ['casual', 'competitive', 'story/campaign', 'grinding', 'social/co-op', 'esports/tournament'],
    },
    socialContext: {
      type: String,
      enum: ['solo', 'friends online', 'local co-op', 'randoms'],
    },

    enjoyment: { type: Number, min: 0, max: 10 },
    performanceRating: { type: Number, min: 0, max: 10 },
    tiltFrustrationLevel: { type: Number, min: 0, max: 10 },
    flowStateLevel: { type: Number, min: 0, max: 10 },
    fatigueAfter: { type: Number, min: 0, max: 10 },
    eyeStrain: { type: Number, min: 0, max: 10 },
    postureQuality: { type: Number, min: 0, max: 10 },

    matches: {
      played: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
    },

    notes: { type: String, maxlength: 2000 },

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

// ========================= PRE-SAVE =========================
gamingSessionSchema.pre('save', function (next) {
  if (this.timestampStart && this.timestampEnd) {
    this.durationMinutes = durationMinutes(this.timestampStart, this.timestampEnd);
  }
  next();
});

module.exports = mongoose.model('GamingSession', gamingSessionSchema);
