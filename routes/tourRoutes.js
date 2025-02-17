const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updatedTour,
  deleteTour,
  alaisTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
// Tour routes
const router = express.Router();

// Check if tour ID exists
// router.param('id', checkID);
router.route('/top-5-tours').get(alaisTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updatedTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
