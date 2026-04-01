require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { protect } = require('./middleware/auth');
const { globalLimiter, authLimiter } = require('./middleware/rateLimiter');

// ─────────────────────────── INIT ───────────────────────────
const app = express();

// ─────────────────────── SECURITY ───────────────────────────
app.use(helmet());                        // Security headers
app.use(cors());                          // CORS
app.use(globalLimiter);                   // Global rate limiter

// ───────────────────────── BODY ─────────────────────────────
app.use(express.json({ limit: '10kb' })); // JSON body with size limit
app.use(express.urlencoded({ extended: false }));

// ──────────────────────── LOGGING ───────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ──────────────────── HEALTH CHECK ──────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ─────────────────── AUTH ROUTES ────────────────────────────
const authRoutes = require('./routes/auth');
app.use('/api/v1/auth/register', authLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth', authRoutes(protect));

// ─────────────── PROTECTED DATA ROUTES ─────────────────────
app.use('/api/v1/sleep',             protect, require('./routes/sleep'));
app.use('/api/v1/work-sessions',     protect, require('./routes/workSessions'));
app.use('/api/v1/meditation',        protect, require('./routes/meditation'));
app.use('/api/v1/devotion',          protect, require('./routes/devotion'));
app.use('/api/v1/gaming-sessions',   protect, require('./routes/gamingSessions'));
app.use('/api/v1/mood',              protect, require('./routes/mood'));
app.use('/api/v1/nutrition',         protect, require('./routes/nutrition'));
app.use('/api/v1/pain-logs',         protect, require('./routes/painLogs'));
app.use('/api/v1/screen-time',       protect, require('./routes/screenTime'));
app.use('/api/v1/sexual-sessions',   protect, require('./routes/sexualSessions'));
app.use('/api/v1/body-metrics',      protect, require('./routes/bodyMetrics'));
app.use('/api/v1/daily-summary',     protect, require('./routes/dailySummary'));
app.use('/api/v1/health-logs',       protect, require('./routes/healthLogs'));
app.use('/api/v1/hobbies',           protect, require('./routes/hobbies'));
app.use('/api/v1/hobby-sessions',    protect, require('./routes/hobbySessions'));
app.use('/api/v1/habits',            protect, require('./routes/habits'));
app.use('/api/v1/habit-logs',        protect, require('./routes/habitLogs'));
app.use('/api/v1/todos',             protect, require('./routes/todos'));
app.use('/api/v1/scores',            protect, require('./routes/scores'));

// ──────────────── 404 HANDLER ───────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ──────────────── ERROR HANDLER ─────────────────────────────
app.use(errorHandler);

// ─────────────────── START SERVER ───────────────────────────
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📋 API base: http://localhost:${PORT}/api/v1`);
  });
};

start();
