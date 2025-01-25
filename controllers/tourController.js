const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  console.log(`Tour ID: ${val}`);
  if (parseInt(req.params.id) > tours.length)
    return res.status(404).json({ status: 'error', message: 'Tour not found' });
  next();
};
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({ status: 'error', message: 'Missing name or price' });
  next();
};
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));
  if (!tour)
    return res.status(404).json({ status: 'error', message: 'Tour not found' });
  res.status(200).json({ status: 'success', data: tour });
};

const createTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = { ...req.body, id: newId };

  // Add validation here to ensure data is valid
  if (!newTour.name || !newTour.price)
    return res.status(400).json({ status: 'error', message: 'Invalid data' });
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, (err) => {
      res.status(201).json({ status: 'success', data: newTour });
    })
  );
};
const updatedTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Data updated successfully' });
};
const deleteTour = (req, res) => {
  res
    .status(204)
    .json({ status: 'success', message: 'Data deleted successfully' });
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updatedTour,
  deleteTour,
  checkID,
  checkBody,
};
