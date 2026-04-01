const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    // ===================== IDENTITY =====================
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'],
    },
    name: { type: String, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phoneNo: { type: String, trim: true },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // never return password by default
    },
    age: { type: Number, min: 0, max: 150 },
    DOB: { type: Date },
    timeZones: [{ type: String }],

    // ===================== ORGANIZATION SYSTEM =====================
    categories: [
      {
        name: { type: String, required: true },
        parentCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
      },
    ],
    projects: [
      {
        name: { type: String, required: true },
        parentProjectId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
      },
    ],
    labels: [{ type: String }],

    // ===================== CONFIGURATION =====================
    meditation: {
      types: {
        type: [String],
        default: ['breath', 'mantra', 'guided', 'silent', 'walking', 'body_scan', 'mindfulness'],
      },
      techniques: [{ type: String }],
      posture: [{ type: String }],
      environment: [{ type: String }],
    },
    taskTypes: {
      type: [String],
      default: ['work', 'study', 'personal'],
    },
    locations: [{ type: String }],

    // ===================== GOALS =====================
    sleepGoals: {
      startTime: { type: String }, // "22:30"
      wakeTime: { type: String },  // "06:00"
      targetSleepHours: { type: Number },
    },
    globalGoals: [
      {
        title: { type: String },
        type: { type: String, enum: ['health', 'productivity', 'spiritual', 'social'] },
        targetValue: { type: Number },
        unit: { type: String },
        deadline: { type: Date },
        priority: { type: Number, min: 1, max: 5 },
        linkedModules: [{ type: String }],
      },
    ],
    screenTimeTarget: { type: Number }, // daily minutes
    dailyWorkHoursGoal: { type: Number },
    dailyMeditationGoal: { type: Number },
    dailyDevotionGoal: { type: Number },

    // ===================== AGGREGATES =====================
    sleepDebt: { type: Number, default: 0 },
    totalDreamCount: { type: Number, default: 0 },
    totalMeditationHours: { type: Number, default: 0 },
    totalDevotionHours: { type: Number, default: 0 },
    totalSleepHours: { type: Number, default: 0 },
    totalGamingHours: { type: Number, default: 0 },
    totalWorkHours: { type: Number, default: 0 },

    // ===================== PREFERENCES =====================
    preferences: {
      notificationsEnabled: { type: Boolean, default: true },
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      activeModules: {
        mood: { type: Boolean, default: true },
        sexualRegulation: { type: Boolean, default: true },
        meditation: { type: Boolean, default: true },
        devotion: { type: Boolean, default: true },
        work: { type: Boolean, default: true },
        screenTime: { type: Boolean, default: true },
        health: { type: Boolean, default: true },
        physicalActivity: { type: Boolean, default: true },
        hobby: { type: Boolean, default: true },
        nutrition: { type: Boolean, default: true },
        tasks: { type: Boolean, default: true },
        dailyEvaluation: { type: Boolean, default: true },
      },
      startOfDayOffsetHours: { type: Number, default: 0, min: 0, max: 6 },
    },
  },
  { timestamps: true }
);

// ========================= HOOKS =========================

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// ========================= METHODS =========================

// Compare entered password to hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Generate signed JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = mongoose.model('User', userSchema);
