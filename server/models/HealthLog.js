const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    morningEnergy: { type: Number, min: 0, max: 10 },
    middayEnergy: { type: Number, min: 0, max: 10 },
    eveningEnergy: { type: Number, min: 0, max: 10 },

    morningBodyStiffness: { type: Number, min: 0, max: 10 },
    sorenessScale: { type: Number, min: 0, max: 10 },
    headacheIntensity: { type: Number, min: 0, max: 10 },

    digestionQuality: { type: Number, min: 0, max: 10 },
    hydrationLevel: { type: Number, min: 0, max: 10 },

    sickStatus: { type: Boolean },
    sicknessIntensity: { type: Number, min: 0, max: 10 },
    symptoms: [{ type: String }],
    breathingQuality: { type: Number, min: 0, max: 10 },
    coughIntensity: { type: Number, min: 0, max: 10 },

    mentalFatigue: { type: Number, min: 0, max: 10 },
    physicalFatigue: { type: Number, min: 0, max: 10 },
    stomachDiscomfort: { type: Number, min: 0, max: 10 },
    restingHeartRate: { type: Number },

    contextNote: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthLog', healthLogSchema);
