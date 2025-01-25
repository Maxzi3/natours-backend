const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updatedTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');
// Tour routes
const router = express.Router();

// Check if tour ID exists
router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updatedTour).delete(deleteTour);

module.exports = router;
