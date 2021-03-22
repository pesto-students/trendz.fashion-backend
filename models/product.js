const mongoose = require('mongoose');
const Joi = require('joi');

const { categorySchema } = require('./category');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: categorySchema,
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: {
    type: Array,
  },
  colors: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(product);
}

const Product = mongoose.model('Product', ProductSchema);

exports.Product = Product;
exports.validate = validateProduct;
