const webpack = require('webpack');
const path = require('path');
const config = require('config.json')('./config/config.json');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = process.env.WEBPACK_ENV;
let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = config.production.libraryName;
} else {
  outputFile = config.development.libraryName;
}

const conf = {
  entry: __dirname + '/src',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname + '/lib'),
    filename: outputFile,
    library: config.libraryName,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.json', '.js'],
  },
  plugins: plugins,
};

module.exports = conf;