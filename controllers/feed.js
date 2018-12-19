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

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  const { postId } = req.params;
  const { content, title, imageUrl } = req.body;

  Post.findByIdAndUpdate(postId, { content, title, imageUrl })
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

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;

  Post.findByIdAndRemove(postId)
    .then(result => {
      res.status(200).json({message: 'Delete success'});
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

  const { content, title, imageUrl } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl,
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