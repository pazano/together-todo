const path = require('path');

const SRC = path.resolve(__dirname, './client/src');
const DIST = path.resolve(__dirname, './client/dist');

module.exports = {
  entry: ['babel-polyfill', `${SRC}/index.jsx`],
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.(css)$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"]
      },
    ]
  }
}