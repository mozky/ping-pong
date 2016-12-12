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

    let options = {
      players: {},
      sets: {}
    };

    for (let key in body) {
      if (key === 'table') {
        options.table = body[key];
      }

      if (key === 'player') {
        const playerName = body[key];
        playerName.forEach(function(player) {
          options.players[player] = false;
        });
      }
    }

    return new Promise(function(resolve, reject) {
      const gameRef = that.db.ref('games').push();

      options['createTime'] = new Date().toISOString();
      gameRef.set(options, function(error) {
        if (error) {
          reject(Error('Firebase addGame() error: ', error));
        } else {
          resolve(gameRef.key);
        }
      });
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
      gameRef.update(query, function(error) {
        if (error) {
          reject(Error('Firebase updateGame() error: ', error));
        } else {
          resolve(gameRef.key);
        }
      });
    });
  }

  addSet(params, body) {
    const that = this;
    let options = {
      gameId: params.idGame,
      redScore: 0,
      blueScore: 0
    };

    for (let key in body) {
      switch (key) {
        case 'red':
          options.red = body[key];
          break;
        case 'blue':
          options.blue = body[key];
          break;
        case 'serves':
          options.serves = body[key];
          break;
        default:
          console.log('unknown key: ', key);
      }
    }

    return new Promise(function(resolve, reject) {
      const gameSetsRef = that.db.ref('games').child(params.idGame + '/sets');
      const setRef = that.db.ref('sets').push();

      options['createTime'] = new Date().toISOString();
      setRef.set(options);

      gameSetsRef.update({
        [setRef.key]: false
      }, function(error) {
        if (error) {
          reject(Error('Firebase addSet() error: ', error));
        } else {
          resolve(setRef.key);
        }
      });
    });
  }

  markPoint(params, query) {
    const that = this;
    let score = 'null';

    if (query.player === 'red') {
      score = 'redScore';
    } else if (query.player === 'blue') {
      score = 'blueScore';
    }

    return new Promise(function(resolve, reject) {
      const scoreRef = that.db.ref('sets/' + params.idSet).child(score);

      scoreRef.transaction(function(currentScore) {
        return (currentScore || 0) + 1;
      }, function(error, committed, newScore) {
        if (error) {
          reject(Error('Firebase markPoint() error: ', error));
        } if (!committed) {
          reject(Error('Firebase markPoint() returned something strange: ', newScore.val()));
        } else {
          resolve({
            [score]: newScore.val()
          });
        }
      });
    });
  }
}

module.exports = GameController;
