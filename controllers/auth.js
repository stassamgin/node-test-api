const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.sigup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation error');
    error.statusCode = 422;
    throw error;
  }
  const { email, name, password } = req.body;
  bcrypt.hash(password, 12)
    .then(result => {
      const user = new User({
        email,
        name,
        password: result
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
};