const admin = require('firebase-admin');
const serviceAccount = require('../../stephen-pong-firebase-adminsdk.key.json');
// const gameUtils = require('../Utils/GameUtils.js');

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
      scores: {
        red: 0,
        blue: 0
      }
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

    return new Promise(function(resolve, reject) {
      const setRef = that.db.ref('sets/' + params.idSet);
      const gameRef = that.db.ref('games/' + params.idGame);
      let scores = {};
      let updates = {};
      let activePlayer = '';
      let passivePlayer = '';
      let winnerName = '';

      if (query.player === 'red') {
        activePlayer = 'red';
        passivePlayer = 'blue';
      } else if (query.player === 'blue') {
        activePlayer = 'blue';
        passivePlayer = 'red';
      }

      setRef.child('scores').once('value').then(function(res) {
        res.forEach(function(obj) {
          scores[obj.key] = obj.val();
        });
        if (scores[activePlayer] < 10) {
          scores[activePlayer] = scores[activePlayer] + 1;
          setRef.child('scores').update(scores, function(error) {
            if (error) {
              reject(Error('Firebase markPoint() error: ', error));
            } else {
              console.log('Player ' + activePlayer + ' +1');
            }
          });
        } else if ((scores[activePlayer] >= 10)
        && ((scores[activePlayer] - scores[passivePlayer]) < 1)) {
          scores[activePlayer] = scores[activePlayer] + 1;
          setRef.child('scores').update(scores, function(error) {
            if (error) {
              reject(Error('Firebase markPoint() error: ', error));
            } else {
              console.log('Player ' + activePlayer + ' +1');
            }
          });
        } else if ((scores[activePlayer] >= 10)
        && ((scores[activePlayer] - scores[passivePlayer]) >= 1)) {
          scores[activePlayer] = scores[activePlayer] + 1;
          updates['scores'] = scores;
          updates['winner'] = activePlayer;
          setRef.update(updates, function(error) {
            if (error) {
              reject(Error('Firebase markPoint() error: ', error));
            } else {
              console.log('Player ' + activePlayer + ' won');
            }
          });

          setRef.once('value').then(function(resp) {
            resp.forEach(function(obj) {
              if (obj.key === activePlayer) {
                winnerName = obj.val();
                // Adds the name of the winner player to the game.set key
                gameRef.child('sets').update({[params.idSet]: winnerName}, function(error) {
                  if (error) {
                    reject(Error('Firebase markPoint() error: ', error));
                  } else {
                    console.log(winnerName + ' set as winner');
                  }
                });
              }
            });
          });
        }
        resolve(scores);
      });
    });
  }

  markTablePoint(params, body) {
    // const that = this;
    // let options = {
    //   gameId: params.idGame,
    //   scores: {
    //     red: 0,
    //     blue: 0
    //   }
    // };
    //
    // for (let key in body) {
    //   switch (key) {
    //     case 'red':
    //       options.red = body[key];
    //       break;
    //     case 'blue':
    //       options.blue = body[key];
    //       break;
    //     case 'serves':
    //       options.serves = body[key];
    //       break;
    //     default:
    //       console.log('unknown key: ', key);
    //   }
    // }

    return new Promise(function(resolve, reject) {
      // const gameSetsRef = that.db.ref('games').child(params.idGame + '/sets');
      // const setRef = that.db.ref('sets').push();
      //
      // options['createTime'] = new Date().toISOString();
      // setRef.set(options);
      //
      // gameSetsRef.update({
      //   [setRef.key]: false
      // }, function(error) {
      //   if (error) {
      //     reject(Error('Firebase addSet() error: ', error));
      //   } else {
      //     resolve(setRef.key);
      //   }
      resolve('TODO');
      // });
    });
  }
}

module.exports = GameController;
