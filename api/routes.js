const routes = require('express').Router();
const GameController = require('./Controllers/GameController');

routes.use(function timeLog(req, res, next) {
  console.log('API Request ->', req.method, req.url, '@', new Date());
  next();
});

routes.get('/', (req, res) => {
  res.status(200).json({ status: 'OK!' });
});

routes.get('/games', (req, res) => {
  res.send(GameController.getGames());
});

routes.post('/games', (req, res) => {
  console.log(req.params);
  res.send(GameController.addGame());
});
//
routes.get('/game/:idGame', (req, res) => {
  res.send(GameController.getGame(req.params));
});

routes.put('/game/:idGame', function(req, res) {
  res.send(GameController.updateGame(req.params));
});

module.exports = routes;
