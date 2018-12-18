const path = require('path');

const express = require('express');
const parser = require('body-parser');

const app = express();

const feedRoutes = require('./routes/feed');

app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(feedRoutes);


app.listen(3000);
