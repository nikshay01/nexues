const mongoose = require('mongoose');
const { durationMinutes } = require('../utils/computedFields');

const hobbySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hobbyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hobby',
      required: true,
      index: true,
    },

    startedAt: { type: Date, required: true },
    endedAt: { type: Date },
    durationMinutes: { type: Number }, // computed

    location: { type: String },
    mainFocus: { type: String },
    immersionLevel: { type: Number, min: 0, max: 10 },
    notes: { type: String, maxlength: 5000 },
    attachments: [
      {
        type: { type: String, enum: ['text', 'photo', 'video'] },
        url: { type: String },
        description: { type: String },
      },
    ],

    overallSessionQuality: { type: Number, min: 0, max: 10 },

    quality: {
      focus: { type: Number, min: 0, max: 10 },
      energy: { type: Number, min: 0, max: 10 },
      enjoyment: { type: Number, min: 0, max: 10 },
      progress: { type: Number, min: 0, max: 10 },
      difficulty: { type: Number, min: 0, max: 10 },
    },

    moodSnapshot: {
      mood: { type: Number, min: 0, max: 10 },
      energy: { type: Number, min: 0, max: 10 },
      stress: { type: Number, min: 0, max: 10 },
    },
  },
  { timestamps: true }
);

hobbySessionSchema.pre('save', function (next) {
  if (this.startedAt && this.endedAt) {
    this.durationMinutes = durationMinutes(this.startedAt, this.endedAt);
  }
  next();
});

module.exports = mongoose.model('HobbySession', hobbySessionSchema);
