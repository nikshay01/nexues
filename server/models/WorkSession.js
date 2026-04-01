const mongoose = require('mongoose');
const { durationMinutes } = require('../utils/computedFields');

const pauseSchema = new mongoose.Schema(
  {
    start: { type: Date },
    end: { type: Date },
    durationMinutes: { type: Number },
    reason: { type: String },
  },
  { _id: false }
);

const workSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMin: { type: Number }, // computed
    productiveTimeMin: { type: Number }, // computed

    taskType: {
      type: String,
      enum: ['professional', 'personal', 'learning', 'creative'],
      required: true,
    },
    taskName: { type: String, required: true, trim: true },
    project: { type: String, trim: true },
    sessionDescription: { type: String, maxlength: 5000 },

    focusLevel: { type: Number, min: 0, max: 10 },
    outputScore: { type: Number, min: 0, max: 10 },
    sessionQuality: { type: Number, min: 0, max: 10 },

    distractionCount: { type: Number, default: 0 },
    distractionDesc: { type: String, maxlength: 1000 },

    pauses: [pauseSchema],

    mentalState: {
      mentalEnergy: { type: Number, min: 0, max: 10 },
      physicalEnergy: { type: Number, min: 0, max: 10 },
      clarity: { type: Number, min: 0, max: 10 },
      motivation: { type: Number, min: 0, max: 10 },
      confidence: { type: Number, min: 0, max: 10 },
      tiredness: { type: Number, min: 0, max: 10 },
      frustration: { type: Number, min: 0, max: 10 },
      stress: { type: Number, min: 0, max: 10 },
      sleepiness: { type: Number, min: 0, max: 10 },
      mood: { type: Number, min: 0, max: 10 },
      anxiety: { type: Number, min: 0, max: 10 },
      flow: { type: Number, min: 0, max: 10 },
      overwhelm: { type: Number, min: 0, max: 10 },
    },

    music: {
      on: { type: Boolean, default: false },
      type: { type: String },
    },

    location: { type: String, trim: true },
  },
  { timestamps: true }
);

// ========================= PRE-SAVE =========================
workSessionSchema.pre('save', function (next) {
  // Auto-compute duration
  if (this.startTime && this.endTime) {
    this.durationMin = durationMinutes(this.startTime, this.endTime);
  }

  // Auto-compute pause durations
  let totalPause = 0;
  if (this.pauses && this.pauses.length > 0) {
    this.pauses.forEach((p) => {
      if (p.start && p.end && !p.durationMinutes) {
        p.durationMinutes = durationMinutes(p.start, p.end);
      }
      totalPause += p.durationMinutes || 0;
    });
  }

  // Auto-compute productive time
  if (this.durationMin != null) {
    this.productiveTimeMin = Math.max(0, this.durationMin - totalPause);
  }

  next();
});

module.exports = mongoose.model('WorkSession', workSessionSchema);
