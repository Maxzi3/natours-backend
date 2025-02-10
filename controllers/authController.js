const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role || 'user', // default role is user
  });

  // sign the token
  const token = signToken(newUser._id);

  // res.cookie('jwt', token, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
  next();
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3)if everything is okay, generate a token and send to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

const protect = catchAsyncError(async (req, res, next) => {
  // 1) Getting Token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token)
    return next(
      new AppError('You are not Logged in! Please Log in to get access', 401)
    );

  // 2) Verfication of Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3)check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User no longer exists.', 401));
  }

  // 4) Check if user change password after the token was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const restrictTo =(...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
}; 

module.exports = {
  signUp,
  login,
  protect,
  restrictTo,
};
