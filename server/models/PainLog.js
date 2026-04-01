const mongoose = require('mongoose');
const { durationMinutes } = require('../utils/computedFields');

const painLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestamp: { type: Date, default: Date.now, index: true },

    bodyParts: [{ type: String }],
    painType: { type: String },
    intensity: { type: Number, min: 0, max: 10 },

    // Per-body-part intensity (optional)
    bodyPartIntensities: [
      {
        bodyPart: { type: String },
        intensity: { type: Number, min: 0, max: 10 },
      },
    ],

    painStartTimestamp: { type: Date },
    painEndTimestamp: { type: Date },
    durationMinutes: { type: Number }, // computed

    possibleTrigger: { type: String },
    contextNote: { type: String, maxlength: 2000 },

    // POST PAIN tracking
    postPain: {
      painEndTimestamp: { type: Date },
      totalDurationMinutes: { type: Number },
      avgIntensity: { type: Number, min: 0, max: 10 },
    },
  },
  { timestamps: true }
);

painLogSchema.pre('save', function (next) {
  if (this.painStartTimestamp && this.painEndTimestamp) {
    this.durationMinutes = durationMinutes(this.painStartTimestamp, this.painEndTimestamp);
  }
  next();
});

module.exports = mongoose.model('PainLog', painLogSchema);
