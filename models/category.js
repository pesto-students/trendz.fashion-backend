const Joi = require('joi');
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(category);
}

const Category = mongoose.model('Category', CategorySchema);

exports.categorySchema = CategorySchema;
exports.Category = Category;
exports.validate = validateCategory;
