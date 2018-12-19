const express = require('express');
const { body } = require('express-validator/check');

const controller = require('../controllers/feed');

const router = express.Router();

router.get('/posts', controller.getPosts);

router.get('/post/:postId', controller.getPost);

router.delete('/post/:postId', controller.deletePost);

router.put('/post/:postId', [
  body('title')
    .trim()
    .isLength({ min: 5 }),
  body('content')
    .trim()
    .isLength({ min: 5 }),
], controller.updatePost);

router.post('/post', [
  body('title')
    .trim()
    .isLength({ min: 5 }),
  body('content')
    .trim()
    .isLength({ min: 5 }),
], controller.createPost);


module.exports = router;