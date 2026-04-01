const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const User = require('../models/User');

module.exports = function (protect) {
const router = express.Router();

// ────────────── REGISTER ──────────────
router.post(
  '/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3-30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers and underscores'),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain uppercase, lowercase and number'),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { username, email, password, name } = req.body;

      // Check existing
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) {
        return res.status(400).json({
          success: false,
          error: existing.email === email ? 'Email already registered' : 'Username already taken',
        });
      }

      const user = await User.create({
        username,
        email,
        passwordHash: password, // hashed in pre-save hook
        name: name || username,
      });

      sendTokenResponse(user, 201, res);
    } catch (err) {
      next(err);
    }
  }
);

// ────────────── LOGIN ──────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+passwordHash');
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      sendTokenResponse(user, 200, res);
    } catch (err) {
      next(err);
    }
  }
);

// ────────────── GET ME ──────────────
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user });
});

// ────────────── UPDATE PROFILE ──────────────
router.put('/me', protect, async (req, res, next) => {
  try {
    // Fields that cannot be updated here
    delete req.body.passwordHash;
    delete req.body.email; // email change should be separate flow
    delete req.body._id;

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

// ────────────── CHANGE PASSWORD ──────────────
router.put(
  '/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain uppercase, lowercase and number'),
    validate,
  ],
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select('+passwordHash');

      const isMatch = await user.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Current password is incorrect' });
      }

      user.passwordHash = req.body.newPassword; // hashed in pre-save hook
      await user.save();

      sendTokenResponse(user, 200, res);
    } catch (err) {
      next(err);
    }
  }
);

// Helper: send JWT in response
function sendTokenResponse(user, statusCode, res) {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    },
  });
}

return router;
};
