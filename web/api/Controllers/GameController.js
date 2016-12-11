const admin = require('firebase-admin');
const serviceAccount = require('../../stephen-pong-firebase-adminsdk.key.json');

// TODO: Validate the objects before sending to firebase,
// maybe create schema for games objetcs

class GameController {

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://stephen-pong.firebaseio.com'
    });
    this.db = admin.database();
  }

  getGames() {
    const that = this;
    return new Promise(function(resolve, reject) {
      let games = [];
      that.db.ref('games').once('value', function(res) {
        res.forEach(function(obj) {
          games.push({
            [obj.key]: obj.val()
          });
        });
        if (games.length > 0) {
          resolve(games);
        } else {
          reject(Error('Network error'));
        }
      });
    });
  }

  addGame(body) {
    const that = this;
    return new Promise(function(resolve, reject) {
      const gameId = that.db.ref('games').push();
      body['createTime'] = new Date().toISOString();
      gameId.set(body);
      if (gameId.key) {
        resolve(gameId.key);
      } else {
        reject(Error('Firebase addGame() error'));
      }
    });
  }

  getGame(params) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.db.ref('games/' + params.idGame).once('value').then(function(res) {
        if (res.key) {
          resolve({
            [res.key]: res.val()
          });
        } else {
          reject(Error('Firebase getGame() error'));
        }
      });
    });
  }

  updateGame(params, query) {
    const that = this;
    return new Promise(function(resolve, reject) {
      query['updateTime'] = new Date().toISOString();
      const gameRef = that.db.ref('games').child(params.idGame);
      gameRef.update(query);
      if (gameRef.key) {
        resolve(gameRef.key);
      } else {
        reject(Error('Firebase updateGame() error'));
      }
    });
  }
}

module.exports = GameController;
