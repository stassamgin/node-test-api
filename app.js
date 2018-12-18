const path = require('path');

const express = require('express');
const parser = require('body-parser');

const feedRoutes = require('./routes/feed');

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

app.listen(3000);
