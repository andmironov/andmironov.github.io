var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/index.js')],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Payments Dashboard Prototype'
    })
  ],

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader'
    },
    {
      test: /\.(eot|woff|woff2|ttf)$/,
      loader: 'url-loader?limit=30000&name=assets/[name]-[hash].[ext]'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=assets/[name]-[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }],
  }
};

module.exports = config;
