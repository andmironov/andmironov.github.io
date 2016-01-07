var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {

  entry: {
    app: path.resolve(__dirname, 'app/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel-loader'
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }],
  }
};

module.exports = config;
