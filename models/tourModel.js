const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name should not exceed 50 characters'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
    min: [1, 'Duration must be at least 1 day'],
    max: [365, 'Duration must not exceed 365 days'],
  },
  maxGoupSize: {
    type: Number,
    // required: [true, 'A tour must have a group size'],
    min: [1, 'Group size must be at least 1 person'],
    max: [20, 'Group size must not exceed 20 people'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be either easy, medium, or difficult',
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    // min: [1, 'Price must be at least $1'],
    // max: [1000, 'Price must not exceed $1000'],
  },
  priceDiscount: {
    type: Number,
    default: 0,
    min: [0, 'Discount must be between 0 and 100'],
    max: [100, 'Discount must not exceed 100'],
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: [200, 'Summary should not exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true,
    required: true,
    maxlength: [4000, 'Description should not exceed 4000 characters'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
