const express = require('express');
const cors = require('cors');

const auth = require('../routes/api/auth');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));

  // Routes
  app.use('/', auth);

  // Test Routes
  app.use('/__test', (req, res) => res.json('Hello world'));
  app.use('/', (req, res) => res.json('Welcome to Trendz.fashion Backend'));

  app.use(error);
};
