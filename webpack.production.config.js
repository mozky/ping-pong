var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, 'builds/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    // Cleanup the builds/ folder before
    // compiling our final assets
    new CleanPlugin('builds'),
    // This plugin optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),
    // This plugin generates a index.html file
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200 // ~50kb
    }),
    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),
    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
