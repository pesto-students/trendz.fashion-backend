const auth = require('../../middleware/auth');
const { Category, validate } = require('../../models/category');
const { ifNotFoundById, validateMongoObjId } = require('../../utils/errorResponse');

const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();

// @route   GET api/v1/admin/category
// @desc    Get the all the category
// @access  Private
router.get('/', auth, async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

// @route   GET api/v1/admin/category/:categoryId
// @desc    Get the category by ID
// @access  Private
router.get('/:categoryId', auth, async (req, res) => {
  const categoryId = req.params.categoryId;
  validateMongoObjId(categoryId, 'category', res);
  const category = await Category.findById(categoryId);
  ifNotFoundById(category, 'category', res);
  res.send(category);
});

// @route   POST api/v1/admin/category
// @desc    Add new category
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({ name });

  await category.save();
  res.send(category);
});

// @route   PUT api/v1/admin/category/:categoryId
// @desc    Update the category by Id
// @access  Private
router.put('/:categoryId', auth, async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;

  validateMongoObjId(categoryId, 'category', res);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
  ifNotFoundById(category, 'category', res);

  res.send(category);
});

// @route   DELETE api/v1/admin/category/:categoryId
// @desc    Delete the category by Id
// @access  Private
router.delete('/:categoryId', auth, async (req, res) => {
  const categoryId = req.params.categoryId;

  validateMongoObjId(categoryId, 'category', res);

  const category = await Category.findByIdAndDelete(categoryId);
  ifNotFoundById(category, 'category', res);

  res.send(category);
});

module.exports = router;
