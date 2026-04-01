const mongoose = require('mongoose');

const checkpointSchema = new mongoose.Schema(
  {
    recordedAt: { type: Date, default: Date.now },
    minutesSoFar: { type: Number },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    start: { type: Date },
    end: { type: Date },
    duration: { type: Number }, // minutes
  },
  { _id: false }
);

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 5000 },

    // Classification
    category: { type: String },
    subcategory: { type: String },
    project: { type: String },
    subproject: { type: String },
    priority: { type: Number, min: 1, max: 5, default: 3 },
    labels: [{ type: String }],

    // Deadline system
    deadline: {
      type: {
        type: String,
        enum: ['exact', 'within', 'range', 'anytime'],
      },
      exactDate: { type: Date },
      windowStart: { type: Date },
      windowEnd: { type: Date },
    },

    // Time planning
    estimatedStartTime: { type: Date },
    estimatedDuration: { type: Number }, // minutes
    estimatedEndTime: { type: Date },

    // Actual execution
    actualStartTime: { type: Date },
    actualEndTime: { type: Date },
    actualDuration: { type: Number }, // computed: sum of session durations

    // Status
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'completed', 'procrastinated'],
      default: 'todo',
    },
    completedAt: { type: Date },

    // Procrastination system
    procrastination: {
      isActive: { type: Boolean, default: false },
      triggeredBy: { type: String, enum: ['auto', 'manual'] },
      clockStartedAt: { type: Date },
      totalMinutes: { type: Number, default: 0 },
      manuallyFlagged: { type: Boolean, default: false },
      checkpoints: [checkpointSchema],
    },

    // Work sessions
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

// ========================= PRE-SAVE =========================
todoSchema.pre('save', function (next) {
  // Auto-compute actual duration from sessions
  if (this.sessions && this.sessions.length > 0) {
    this.actualDuration = this.sessions.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    );
  }

  // Auto-set completedAt
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }

  next();
});

module.exports = mongoose.model('Todo', todoSchema);
