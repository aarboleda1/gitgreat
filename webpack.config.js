var path = require('path');


module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'client'),
  entry: [
    './CreateEventAppIndex.js',
    './HomepageAppIndex.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style-loader!css-loader" },
          { test: /\.useable\.css$/, loader: "style-loader/useable!css-loader" }
        ]
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};

