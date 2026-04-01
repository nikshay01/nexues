const mongoose = require('mongoose');

const devotionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timestampStart: { type: Date, required: true },
    durationMinutes: { type: Number },

    // TIME
    timeCategory: {
      type: String,
      enum: ['brahma-muhurta', 'morning', 'noon', 'evening', 'night'],
    },

    // SETUP
    devotionType: {
      type: String,
      enum: ['mandir', 'puja', 'aarti', 'jaap', 'path', 'kirtan', 'seva', 'satsang', 'vrat', 'other'],
    },
    deityFocus: {
      type: String,
      enum: ['Shiva', 'Vishnu', 'Devi', 'Ganesha', 'Ram', 'Krishna', 'other'],
    },
    location: {
      type: String,
      enum: ['home-mandir', 'temple', 'ashram', 'river', 'open-nature', 'other'],
    },
    templeName: { type: String },

    // GUIDE
    guided: { type: Boolean, default: false },
    guideType: {
      type: String,
      enum: ['pandit', 'guru', 'organization', 'self'],
    },
    guideName: { type: String },
    organizationName: { type: String },

    // PHYSICAL
    posture: {
      type: String,
      enum: ['standing', 'seated', 'kneeling', 'prostrating'],
    },

    // MENTAL & EMOTIONAL STATE
    preMood: {
      type: String,
      enum: ['anxious', 'sad', 'neutral', 'calm', 'devotional', 'joyful'],
    },
    postMood: {
      type: String,
      enum: ['anxious', 'sad', 'neutral', 'calm', 'devotional', 'joyful'],
    },
    preStressLevel: { type: Number, min: 0, max: 10 },
    postStressLevel: { type: Number, min: 0, max: 10 },
    stressDelta: { type: Number }, // computed
    emotionalIntensity: { type: Number, min: 0, max: 10 },
    senseOfPeace: { type: Number, min: 0, max: 10 },
    focusDuring: { type: Number, min: 0, max: 10 },
    gratitudeLevel: { type: Number, min: 0, max: 10 },
    bhaktiFelt: { type: Number, min: 0, max: 10 },
    surrenderFelt: { type: Number, min: 0, max: 10 },

    // SPIRITUAL DEPTH
    divineConnectionFelt: { type: Number, min: 0, max: 10 },

    // CUSTOM FIELDS
    customFields: [
      {
        name: { type: String },
        value: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    // CONTEXT
    contextNote: { type: String, maxlength: 2000 },
    preActivity: {
      type: String,
      enum: ['sleep', 'exercise', 'work', 'eating', 'commute', 'other'],
    },
    contextLocation: {
      type: String,
      enum: ['home', 'work', 'travel', 'pilgrimage', 'other'],
    },
    socialContext: {
      type: String,
      enum: ['alone', 'with family', 'with community', 'with guru'],
    },

    // OUTCOME
    sessionRating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// ========================= PRE-SAVE =========================
devotionSchema.pre('save', function (next) {
  // Auto-compute stress delta
  if (this.preStressLevel != null && this.postStressLevel != null) {
    this.stressDelta = this.preStressLevel - this.postStressLevel;
  }
  next();
});

module.exports = mongoose.model('Devotion', devotionSchema);
