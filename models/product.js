const mongoose = require('mongoose');
const Joi = require('joi');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Category',
    },
  ],
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
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().required(),
    productCategory: Joi.array(),
    rating: Joi.number().min(0).max(5),
  });

  return schema.validate(product);
}

const Product = mongoose.model('Product', ProductSchema);

exports.Product = Product;
exports.validate = validateProduct;
