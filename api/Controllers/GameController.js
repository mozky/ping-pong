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

  addGame() {
    const gameId = this.db.push();
    gameId.set({
      createTime: new Date(),
      tableId: 1,
      blue: 'foo',
      red: 'bar'
    });
    return gameId.key;
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
          reject(Error('Network error'));
        }
      });
    });
  }

  updateGame(params, query) {
    query['updateTime'] = new Date();
    const gameRef = this.db.child(params.idGame);
    gameRef.update(query);
    return gameRef.key;
  }

}

module.exports = GameController;
