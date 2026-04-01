const mongoose = require('mongoose');
const { completionPercent } = require('../utils/computedFields');

const habitLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HabitDefinition',
      required: true,
      index: true,
    },

    periodDate: { type: Date, required: true, index: true },
    loggedAt: { type: Date, default: Date.now },

    // Completion
    completionType: { type: String },
    targetValue: { type: Number },
    loggedValue: { type: Number },
    periodTotalValue: { type: Number },
    completionPercent: { type: Number }, // computed

    // Time block tracking
    timeBlock: {
      planned: {
        start: { type: String },
        end: { type: String },
      },
      actual: {
        start: { type: Date },
        end: { type: Date },
      },
      minutesLate: { type: Number },
    },

    // State
    mood: { type: Number, min: 0, max: 10 },
    energy: { type: Number, min: 0, max: 10 },
    notes: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

habitLogSchema.pre('save', function (next) {
  if (this.periodTotalValue != null && this.targetValue != null) {
    this.completionPercent = completionPercent(this.periodTotalValue, this.targetValue);
  }
  next();
});

module.exports = mongoose.model('HabitLog', habitLogSchema);
