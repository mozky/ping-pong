/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const favicon = require('serve-favicon');
// const GameController = require('./src/Controllers/GameController');


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(favicon(path.join(__dirname, '/public/favicon-32x32.png')));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'src/index.html')));
    res.end();
  });

  app.route('/games')
  .get(function(req, res) {
    console.log(req.params);
    res.send('Get games');
  })
  .post(function(req, res) {
    console.log(req.params);
    res.send('Add new game, should return gameId');
  });

  app.route('/game/:idGame')
  .get(function(req, res) {
    console.log(req.params);
    res.send('Get game info');
  })
  .post(function(req, res) {
    console.log(req.params);
    res.send('Post info to game');
  })
  .put(function(req, res) {
    console.log(req.params);
    res.send('Update info of game');
  });
} else {
  app.use(express.static(path.join(__dirname, '/builds')));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'builds/index.html'));
  });
}

app.use(function(req, res) {
  res.status(404).send('TODO: 404 Page');
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
