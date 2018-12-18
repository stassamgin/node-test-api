const path = require('path');

const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000);
