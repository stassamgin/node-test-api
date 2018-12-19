const path = require('path');

const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const { mongodbUrl, serverPort } = require('./config');

const app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(mongodbUrl)
  .then(result => {
    app.listen(serverPort);
  })
  .catch(err => {
    console.log(err);
  });
