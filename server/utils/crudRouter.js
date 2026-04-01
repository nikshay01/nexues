/**
 * Generic CRUD route factory.
 * Creates standard GET all, GET one, POST, PUT, DELETE routes for any Mongoose model.
 * All routes are user-scoped (userId filter).
 */
const express = require('express');

/**
 * Build a standard CRUD router for a model.
 * @param {mongoose.Model} Model – Mongoose model
 * @param {Object} [opts] – options
 * @param {string} [opts.dateField='date'] – field name used for date filtering
 * @param {Function} [opts.beforeCreate] – async (req) => modify req.body before create
 * @param {Function} [opts.afterCreate] – async (doc, req) => side-effects after create
 * @param {Function} [opts.beforeUpdate] – async (req) => modify req.body before update
 * @returns {express.Router}
 */
function crudRouter(Model, opts = {}) {
  const router = express.Router();
  const dateField = opts.dateField || 'date';

  // ────────────── GET ALL ──────────────
  router.get('/', async (req, res, next) => {
    try {
      const filter = { userId: req.user._id };

      // Date filters
      if (req.query.date) {
        const d = new Date(req.query.date);
        const next_d = new Date(d);
        next_d.setDate(next_d.getDate() + 1);
        filter[dateField] = { $gte: d, $lt: next_d };
      } else if (req.query.from || req.query.to) {
        filter[dateField] = {};
        if (req.query.from) filter[dateField].$gte = new Date(req.query.from);
        if (req.query.to) filter[dateField].$lte = new Date(req.query.to);
      }

      // Pagination
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
      const skip = (page - 1) * limit;

      // Sort
      const sort = req.query.sort || `-${dateField}`;

      const [docs, total] = await Promise.all([
        Model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        Model.countDocuments(filter),
      ]);

      res.json({
        success: true,
        count: docs.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: docs,
      });
    } catch (err) {
      next(err);
    }
  });

  // ────────────── GET ONE ──────────────
  router.get('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findOne({
        _id: req.params.id,
        userId: req.user._id,
      }).lean();

      if (!doc) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  });

  // ────────────── CREATE ──────────────
  router.post('/', async (req, res, next) => {
    try {
      req.body.userId = req.user._id;

      if (opts.beforeCreate) {
        await opts.beforeCreate(req);
      }

      const doc = await Model.create(req.body);

      if (opts.afterCreate) {
        await opts.afterCreate(doc, req);
      }

      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  });

  // ────────────── UPDATE ──────────────
  router.put('/:id', async (req, res, next) => {
    try {
      // Prevent changing ownership
      delete req.body.userId;
      delete req.body._id;

      if (opts.beforeUpdate) {
        await opts.beforeUpdate(req);
      }

      let doc = await Model.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!doc) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      // Merge fields and save (triggers pre-save hooks)
      Object.assign(doc, req.body);
      doc = await doc.save();

      res.json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  });

  // ────────────── DELETE ──────────────
  router.delete('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!doc) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
      }

      res.json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = crudRouter;
