const routes = require('express').Router();
const GameController = require('./Controllers/GameController');

// TODO: Add better error handlings

const GC = new GameController();

routes.use(function timeLog(req, res, next) {
  console.log('API Request ->', req.method, req.url, '@', new Date());
  next();
});

routes.get('/', (req, res) => {
  res.status(200).json({ status: 'OK!' });
});

routes.get('/games', (req, res) => {
  GC.getGames().then(function(response) {
    res.status(200).json(response);
  }, function(error) {
    console.error('API Error ->', req.method, req.url, '@', new Date(), error);
    res.status(503).send('Bad Request');
  });
});

routes.post('/game', (req, res) => {
  GC.addGame(req.body).then(function(response) {
    res.status(200).send(response);
  }, function(error) {
    console.error('API Error ->', req.method, req.url, '@', new Date(), error);
    res.status(503).send('Bad Request');
  });
});

routes.get('/game/:idGame', (req, res) => {
  GC.getGame(req.params).then(function(response) {
    res.status(200).json(response);
  }, function(error) {
    console.error('API Error ->', req.method, req.url, '@', new Date(), error);
    res.status(503).send('Bad Request');
  });
});

routes.put('/game/:idGame', function(req, res) {
  GC.updateGame(req.params, req.query).then(function(response) {
    res.status(200).send(response);
  }, function(error) {
    console.error('API Error ->', req.method, req.url, '@', new Date(), error);
    res.status(503).send('Bad Request');
  });
});

module.exports = routes;
