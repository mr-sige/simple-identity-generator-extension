const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  // Entry files for our popup and background pages
  entry: {
    popup: './src/popup.js'
  },
  // Extension will be built into ./dist folder, which we can then load as unpacked extension in Chrome
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  // Here we define loaders for different file types
  module: {
    rules: [
      // We use Babel to transpile JSX
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=100000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?limit=100000',
          {
            loader: 'img-loader',
            options: {
              enabled: true,
              optipng: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { context: './src/assets', from: 'icon**', to: 'assets' }
    ]),
    new ZipPlugin({
      filename: 'sige.zip',
      path: 'package'
    })
  ]
};
