var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

//Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var config = {

  entry: {
    app: path.resolve(__dirname, 'app/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[hash].js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'Payments Dashboard Prototype',
      template: 'app/templates/template.html',
      inject: 'body'
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel-loader'
    },{
      test: /\.(eot|woff|woff2|ttf)$/,
      loader: 'url-loader?limit=30000&name=assets/[name]-[hash].[ext]'
    },{
      test: /\.scss$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version!sass'
    },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }],
  }
};

module.exports = config;
