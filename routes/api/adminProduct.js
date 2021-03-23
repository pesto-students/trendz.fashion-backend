const auth = require('../../middleware/auth');
const { Product, validate } = require('../../models/product');
const { Category } = require('../../models/category');
const { ifNotFoundById, validateMongoObjId } = require('../../utils/errorResponse');

const express = require('express');
const _ = require('lodash');
const router = express.Router();

// @route   GET api/v1/admin/product
// @desc    Get the all the product
// @access  Private
router.get('/', auth, async (req, res) => {
  const product = await Product.find().populate('productCategory');

  res.send(product);
});

// @route   GET api/v1/admin/product/:productId
// @desc    Get the product by ID
// @access  Private
router.get('/:productId', auth, async (req, res) => {
  const productId = req.params.productId;
  validateMongoObjId(productId, 'product', res);
  const product = await Product.findById(productId).populate('categoryId');
  ifNotFoundById(product, 'product', res);
  res.send(product);
});

// @route   POST api/v1/admin/product
// @desc    Add new product
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, price, productCategory, rating } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  productCategory.forEach(async (proCat) => {
    validateMongoObjId(proCat._id, 'category', res);
    const category = await Category.findById(proCat._id);
    ifNotFoundById(category, 'category', res);
  });

  let product = new Product({
    title,
    description,
    productCategory,
    price,
    rating,
  });

  product = await product.save();
  product = await Product.findById(product._id).populate('productCategory');
  res.send(product);
});

// @route   PUT api/v1/admin/product/:productId
// @desc    Update the product by Id
// @access  Private
router.put('/:productId', auth, async (req, res) => {
  const { title, description, price, productCategory, rating } = req.body;
  const productId = req.params.productId;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  validateMongoObjId(productId, 'product', res);

  productCategory.forEach(async (proCat) => {
    validateMongoObjId(proCat._id, 'category', res);
    const category = await Category.findById(proCat._id);
    ifNotFoundById(category, 'category', res);
  });

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      title,
      description,
      price,
      productCategory,
      rating,
    },
    { new: true }
  ).populate('productCategory');
  ifNotFoundById(product, 'product', res);

  res.send(product);
});

// @route   DELETE api/v1/admin/product/:productId
// @desc    Delete the product by Id
// @access  Private
router.delete('/:productId', auth, async (req, res) => {
  const productId = req.params.productId;

  validateMongoObjId(productId, 'product', res);

  const product = await Product.findByIdAndDelete(productId);
  ifNotFoundById(product, 'product', res);

  res.send(product);
});

module.exports = router;
