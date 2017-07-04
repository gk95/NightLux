const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = resolve(__dirname, '..', 'dist');

module.exports = {
  context: resolve(__dirname, '..'),
  entry: {
    app: [
      'react-hot-loader/patch',
      './app/src/index.js'
    ],
    vendor: './app/src/vendor.js'
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    contentBase: distPath,
    publicPath: '/',
    stats: 'minimal',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { 'modules': false }],
            'stage-1',
            'react'
          ],
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'app', 'index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};
