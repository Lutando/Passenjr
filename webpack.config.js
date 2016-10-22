var webpack = require('webpack');
var path = require('path');
var ignore = new webpack.IgnorePlugin(/\.svg$/)

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'scripts'),
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './main.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'server/public'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      { test: /\.css$/, loaders: ['style','css']},
    ],
  },
  plugins: [
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8000',
    },
  },
};
