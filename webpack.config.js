var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(__dirname);

config = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:1337',
      path.resolve(__dirname, 'app/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style","css!sass")
      }, {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader?name=./fonts/[hash].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }]
    },
    plugins: [
      new ExtractTextPlugin("app.css")
    ]
};

module.exports = config;
