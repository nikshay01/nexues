const mongoose = require('mongoose');
const { autopilotPercent } = require('../utils/computedFields');

const screenTimeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    totalScreenTimeMinutes: { type: Number },
    unlockCount: { type: Number },

    socialMediaMinutes: { type: Number },
    entertainmentMinutes: { type: Number },
    productiveMinutes: { type: Number },
    learningMinutes: { type: Number },
    gamingMinutes: { type: Number },

    shortFormUsed: { type: Boolean },
    lateNightUsage: { type: Boolean },
    inBedUsage: { type: Boolean },

    intentionalPercent: { type: Number, min: 0, max: 100 },
    autopilotPercent: { type: Number, min: 0, max: 100 }, // computed
  },
  { timestamps: true }
);

screenTimeSchema.pre('save', function (next) {
  if (this.intentionalPercent != null) {
    this.autopilotPercent = autopilotPercent(this.intentionalPercent);
  }
  next();
});

module.exports = mongoose.model('ScreenTime', screenTimeSchema);
