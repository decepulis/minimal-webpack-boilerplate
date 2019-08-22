const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    base: './src/scripts/base.js',
    index: './src/scripts/index.js',
    about: './src/scripts/about.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.hbs$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'handlebars-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index.hbs',
      chunks: ['base', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: 'src/pages/about.hbs',
      chunks: ['base', 'about']
    }),
  ],
};