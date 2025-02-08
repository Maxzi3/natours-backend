const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsyncError');


const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
const createUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route isnt defined' });
};
const updatedUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route isnt defined' });
};
const deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route isnt defined' });
};
const getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route isnt defined' });
};

module.exports = {
  getAllUsers,
  createUser,
  updatedUser,
  deleteUser,
  getUser,
};
