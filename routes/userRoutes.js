const express = require('express');
const {
  getAllUsers,
  createUser,
  updatedUser,
  deleteUser,
  getUser,
} = require('../controllers/userController');
const { signUp, login } = require('../controllers/authController');

//  User routes
const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login)

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updatedUser).delete(deleteUser);

module.exports = router;
