var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.join(__dirname, 'builds/'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2 // How many times a dependency must come up before being extracted
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.html/,
        loader: 'html'
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=10000'
      }
    ]
  }
};
