const mongoose = require('mongoose');

const bodyMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    recordedAt: { type: Date, default: Date.now, index: true },

    measurements: {
      arms: {
        leftBicepCm: { type: Number },
        rightBicepCm: { type: Number },
        leftForearmCm: { type: Number },
        rightForearmCm: { type: Number },
        leftUpperArmCm: { type: Number },
        rightUpperArmCm: { type: Number },
      },
      torso: {
        chestRelaxedCm: { type: Number },
        chestFlexedCm: { type: Number },
        waistCm: { type: Number },
        abdominalCm: { type: Number },
        hipsCm: { type: Number },
      },
      shoulders: {
        leftCm: { type: Number },
        rightCm: { type: Number },
        widthCm: { type: Number },
      },
      legs: {
        leftThighCm: { type: Number },
        rightThighCm: { type: Number },
        leftCalfCm: { type: Number },
        rightCalfCm: { type: Number },
      },
      body: {
        heightCm: { type: Number },
        weightKg: { type: Number },
        neckCm: { type: Number },
        wristCm: { type: Number },
        bodyFatPercent: { type: Number },
      },
    },

    notes: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BodyMetric', bodyMetricSchema);
