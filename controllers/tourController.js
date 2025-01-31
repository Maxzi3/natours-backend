const Tour = require('./../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) FILTERING BY QUERY PARAMS
    const queryObj = { ...req.query };
    const exclude = ['page', 'limit', 'sort', 'fields'];
    exclude.forEach((param) => delete queryObj[param]);

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match.toLowerCase()}`
    );
    let query = Tour.find(JSON.parse(queryStr));

    //  2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    //  3) FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    // 4) PAGINATION
    if (req.query.page && req.query.limit) {
      let page = parseInt(req.query.page, 10);
      let limit = parseInt(req.query.limit, 10);

      // Ensure valid page and limit
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 100;

      const startIndex = (page - 1) * limit;
    }
    query = query.skip(startIndex).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('Page does not exist');
    }

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
    console.error(error);
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: newTour });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
    console.error(error);
  }
};
const updatedTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
    console.error(error);
  }
};
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ status: 'success', message: 'Data deleted successfully' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
    console.error(error);
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updatedTour,
  deleteTour,
};
