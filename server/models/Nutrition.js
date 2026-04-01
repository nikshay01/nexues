const mongoose = require('mongoose');

const nutritionItemSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    portion: {
      quantity: { type: Number },
      unit: { type: String, enum: ['g', 'ml', 'piece', 'bowl', 'tsp', 'tbsp', 'cup', 'plate'] },
    },
    nutrition: {
      caloriesKcal: { type: Number },
      proteinG: { type: Number },
      carbsG: { type: Number },
      fatG: { type: Number },
      fiberG: { type: Number },
    },
  },
  { _id: false }
);

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['breakfast', 'lunch', 'snack', 'dinner', 'pre-workout', 'post-workout', 'other'],
    },
    timestamp: { type: Date },
    items: [nutritionItemSchema],
    mealTotals: {
      caloriesKcal: { type: Number },
      proteinG: { type: Number },
      carbsG: { type: Number },
      fatG: { type: Number },
      fiberG: { type: Number },
    },
  },
  { _id: true }
);

const nutritionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: { type: Date, required: true, index: true },

    meals: [mealSchema],

    dailyTotals: {
      caloriesKcal: { type: Number, default: 0 },
      proteinG: { type: Number, default: 0 },
      carbsG: { type: Number, default: 0 },
      fatG: { type: Number, default: 0 },
      fiberG: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// ========================= PRE-SAVE =========================
nutritionSchema.pre('save', function (next) {
  const keys = ['caloriesKcal', 'proteinG', 'carbsG', 'fatG', 'fiberG'];

  // Compute meal totals
  if (this.meals && this.meals.length > 0) {
    this.meals.forEach((meal) => {
      if (meal.items && meal.items.length > 0) {
        meal.mealTotals = {};
        keys.forEach((key) => {
          meal.mealTotals[key] = meal.items.reduce(
            (sum, item) => sum + ((item.nutrition && item.nutrition[key]) || 0),
            0
          );
        });
      }
    });

    // Compute daily totals
    this.dailyTotals = {};
    keys.forEach((key) => {
      this.dailyTotals[key] = this.meals.reduce(
        (sum, meal) => sum + ((meal.mealTotals && meal.mealTotals[key]) || 0),
        0
      );
    });
  }

  next();
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
