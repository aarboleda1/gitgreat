const express = require('express');
const parser = require('body-parser');
const path = require('path');
const url = require('url');

const db = require('../db');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

//Webpack 
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);
//serve public folder static files
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(path.join(__dirname, '../dist')));
//serve node_modules via the '/script' virtual file path
app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));

const mainRoutes = require('./routes/')(app);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;