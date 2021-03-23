const auth = require('../../middleware/auth');
const { User, validate } = require('../..//models/user');

const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// @route   GET api/v1/user/me
// @desc    Get the logged in user details
// @access  Private
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

module.exports = router;
