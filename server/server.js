const express = require('express');
const parser = require('body-parser');
const path = require('path');
const url = require('url');

const db = require('../db');

const app = express();
app.use(parser.json());

//serve public folder static files
app.use(express.static(path.join(__dirname, '../public')));

//serve node_modules via the '/script' virtual file path
app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));

const mainRoutes = require('./routes/')(app);

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});

module.exports = app;