const express = require('express');
const cors = require('cors');

const auth = require('../routes/api/auth');
const user = require('../routes/api/user');
const adminProduct = require('../routes/api/adminProduct');
const adminCategory = require('../routes/api/adminCategory');

const error = require('../middleware/error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));

  // Routes
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/user', user);
  app.use('/api/v1/admin/product', adminProduct);
  app.use('/api/v1/admin/category', adminCategory);

  // Test Routes
  app.use('/__test', (req, res) => res.json('Hello world'));
  app.use('/', (req, res) => res.json('Welcome to Trendz.fashion Backend'));

  app.use(error);
};
