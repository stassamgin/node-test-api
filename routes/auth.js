const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const controller = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter correct email')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(result => {
          if(result) {
            return Promise.reject('E-mail address already exist')
          }
        })
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 }),
  body('name')
    .trim()
    .not()
    .isEmpty(),
], controller.sigup);


module.exports = router;