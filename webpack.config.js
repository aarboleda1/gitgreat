var path = require('path');


module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'client'),
  entry: [
    './Main.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.css$/, loaders: ["style-loader","css-loader"] },,
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

