const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then(result => {
      if(!result) {
        const error = new Error('Not found post');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  const { content, title, image_url } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl: image_url,
    creator: {
      name: 'Test_creator'
    }
  });
  post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post create successfully',
        data: result
      });
    })
    .catch(err => {
      next(err);
    });
};