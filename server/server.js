const express = require('express');
const path = require('path');
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const configProvider = require('./config/config');
const axios = require('axios');
const querystring = require('querystring');

const port = 8000;
const compiler = webpack(webpackConfig);
const app = express();
const config = configProvider().config;

console.log('configuration');
console.log(config);

//Webpack Middleware
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'main.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));


app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));



app.get("/api/token", function (req, res) {
    body = {
      client_id: config.client.id,
      client_secret: config.client.secret,
      grant_type: 'client_credentials',
      scope: 'transitapi:all',
    };

    axios.post(`${config.identityStsUrl}/connect/token/`, querystring.stringify(body))
    .then(function(response) {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(JSON.stringify('token could not be retrieved'));
     })

});


app.use("/", express.static(path.join(__dirname, './public')));

app.listen(port, function() {
    console.log(`Server running on ${port}!`);
});