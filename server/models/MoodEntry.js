const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    intensity: { type: Number, min: 0, max: 10 },
  },
  { _id: false }
);

const moodEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestamp: { type: Date, default: Date.now, index: true },

    // Core metrics (0-10)
    mood: { type: Number, min: 0, max: 10 },
    energy: { type: Number, min: 0, max: 10 },
    mentalClarity: { type: Number, min: 0, max: 10 },
    calmness: { type: Number, min: 0, max: 10 },
    anxiety: { type: Number, min: 0, max: 10 },
    tiredness: { type: Number, min: 0, max: 10 },

    confidence: { type: Number, min: 0, max: 10 },
    motivation: { type: Number, min: 0, max: 10 },
    frustration: { type: Number, min: 0, max: 10 },
    stress: { type: Number, min: 0, max: 10 },
    overthinking: { type: Number, min: 0, max: 10 },

    brainFog: { type: Number, min: 0, max: 10 },
    sickness: { type: Number, min: 0, max: 10 },
    laziness: { type: Number, min: 0, max: 10 },
    boredom: { type: Number, min: 0, max: 10 },
    mindfulness: { type: Number, min: 0, max: 10 },

    // Multi-entry emotions
    emotions: [emotionSchema],

    // Context
    contextActivity: { type: String },
    contextLocation: { type: String },
    contextSocially: { type: String },
    contextNote: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MoodEntry', moodEntrySchema);
