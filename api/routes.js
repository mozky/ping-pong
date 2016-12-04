const routes = require('express').Router();
const GameController = require('./Controllers/GameController');

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

routes.post('/games', (req, res) => {
  console.log(req.params);
  res.send(GC.addGame());
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
  res.send(GC.updateGame(req.params, req.query));
});

module.exports = routes;
