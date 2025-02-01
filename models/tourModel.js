const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name should not exceed 50 characters'],
      minlength: [10, 'Name should be more than 10 characters'],
      validate: [validator.isAlpha, 'Tour name should only contain alphabetic characters'],
    },
    slug: String,
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
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount Price ({VALUE}) should be below the regular price',
      },
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
      // required: [true, 'A tour must have a description'],
      trim: true,
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE
tourSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.pre('save', async function (next) {
//   console.log("Will save doc...")
//   next();
// });
// tourSchema.post('save', async function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, async function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, async function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  console.log(this);
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
