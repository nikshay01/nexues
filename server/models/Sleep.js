const mongoose = require('mongoose');
const { durationMinutes, durationHours } = require('../utils/computedFields');

const interruptionSchema = new mongoose.Schema(
  {
    wakeTime: { type: Date },
    backToSleepTime: { type: Date },
    durationMinutes: { type: Number },
    reason: {
      type: String,
      enum: ['bathroom', 'noise', 'anxiety', 'pain', 'random', 'other'],
    },
  },
  { _id: false }
);

const napSchema = new mongoose.Schema(
  {
    startTime: { type: Date },
    endTime: { type: Date },
    durationMinutes: { type: Number },
    quality: { type: Number, min: 0, max: 10 },
  },
  { _id: false }
);

const dreamSchema = new mongoose.Schema(
  {
    description: { type: String },
    vividness: { type: Number, min: 0, max: 10 },
    emotionalTone: {
      type: String,
      enum: ['positive', 'negative', 'neutral', 'mixed'],
    },
    lucid: { type: Boolean, default: false },
  },
  { _id: false }
);

const sleepSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    // TIMING
    sleepStart: { type: Date },
    sleepEnd: { type: Date },
    totalSleepHours: { type: Number }, // computed

    // GOALS
    targetSleepTime: { type: String }, // "21:30"
    targetWakeTime: { type: String },  // "05:30"
    targetSleepHours: { type: Number },

    // GOAL DELTAS (computed)
    sleepStartDeltaMinutes: { type: Number },
    wakeTimeDeltaMinutes: { type: Number },
    sleepHoursDelta: { type: Number },

    // QUALITY
    sleepQuality: { type: Number, min: 0, max: 10 },
    restfulness: { type: Number, min: 0, max: 10 },
    sleepinessOnWake: { type: Number, min: 0, max: 10 },
    easeOfFallingAsleep: { type: Number, min: 0, max: 10 },

    // INTERRUPTIONS
    sleepInterruptionsCount: { type: Number, default: 0 },
    interruptions: [interruptionSchema],
    totalInterruptionMinutes: { type: Number, default: 0 }, // computed

    // SLEEP DEBT
    sleepDebtHours: { type: Number },

    // NAPS
    naps: [napSchema],
    totalNapMinutes: { type: Number, default: 0 },

    // DREAMS
    dreamCount: { type: Number, default: 0 },
    dreams: [dreamSchema],

    // PRE-SLEEP STATE
    preStress: { type: Number, min: 0, max: 10 },
    preAnxiety: { type: Number, min: 0, max: 10 },
    preEnergy: { type: Number, min: 0, max: 10 },
    preScreenTimeMinutes: { type: Number },
    caffeineIntakeAfter2pm: { type: Boolean },
    lateMeal: { type: Boolean },
    preActivity: {
      type: String,
      enum: ['exercise', 'work', 'screen', 'reading', 'meditation', 'other'],
    },

    // POST-SLEEP STATE
    postEnergy: { type: Number, min: 0, max: 10 },
    postMood: { type: Number, min: 0, max: 10 },
    postMentalClarity: { type: Number, min: 0, max: 10 },
    postBodyStiffness: { type: Number, min: 0, max: 10 },

    contextNote: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

// ========================= PRE-SAVE COMPUTATIONS =========================
sleepSchema.pre('save', function (next) {
  // Auto-compute interruption durations
  if (this.interruptions && this.interruptions.length > 0) {
    this.interruptions.forEach((i) => {
      if (i.wakeTime && i.backToSleepTime && !i.durationMinutes) {
        i.durationMinutes = durationMinutes(i.wakeTime, i.backToSleepTime);
      }
    });
    this.totalInterruptionMinutes = this.interruptions.reduce(
      (sum, i) => sum + (i.durationMinutes || 0),
      0
    );
    this.sleepInterruptionsCount = this.interruptions.length;
  }

  // Auto-compute nap durations
  if (this.naps && this.naps.length > 0) {
    this.naps.forEach((n) => {
      if (n.startTime && n.endTime && !n.durationMinutes) {
        n.durationMinutes = durationMinutes(n.startTime, n.endTime);
      }
    });
    this.totalNapMinutes = this.naps.reduce(
      (sum, n) => sum + (n.durationMinutes || 0),
      0
    );
  }

  // Total sleep hours
  if (this.sleepStart && this.sleepEnd) {
    const rawHours = durationHours(this.sleepStart, this.sleepEnd);
    this.totalSleepHours = parseFloat(
      (rawHours - (this.totalInterruptionMinutes || 0) / 60).toFixed(2)
    );
  }

  // Sleep hours delta
  if (this.totalSleepHours != null && this.targetSleepHours != null) {
    this.sleepHoursDelta = parseFloat(
      (this.totalSleepHours - this.targetSleepHours).toFixed(2)
    );
  }

  // Dream count
  if (this.dreams) {
    this.dreamCount = this.dreams.length;
  }

  next();
});

module.exports = mongoose.model('Sleep', sleepSchema);
