import React from 'react';
import NewGame from './NewGame.jsx';
import Game from './Game.jsx';
import request from 'request';
import fb from '../firebase';


export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRedPlayerChange = this.handleRedPlayerChange.bind(this);
    this.handleBluePlayerChange = this.handleBluePlayerChange.bind(this);
    this.handleRedPlayerConfirm = this.handleRedPlayerConfirm.bind(this);
    this.handleBluePlayerConfirm = this.handleBluePlayerConfirm.bind(this);
    this.handleRedPoint = this.handleRedPoint.bind(this);
    this.handleBluePoint = this.handleBluePoint.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      inGame: false,
      game: {},
      set: {},
      gameId: null,
      gameBind: null,
      setId: null,
      setBind: null,
      red: 'redPlayer',
      blue: 'bluePlayer',
      redReady: false,
      blueReady: false
    };
  }

  handleRedPlayerChange(user) {
    this.setState({red: user});
  }

  handleBluePlayerChange(user) {
    this.setState({blue: user});
  }

  handleRedPlayerConfirm(value) {
    this.setState({redReady: (value === 'true')});
  }

  handleBluePlayerConfirm(value) {
    this.setState({blueReady: (value === 'true')});
  }

  handleRedPoint() {
    request.put(
      'http://localhost:3000/api/game/' + this.state.gameId + '/set/' + this.state.setId,
      { qs: {
        player: 'red'
      }
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('Response body', body);
        }
      }
    );
  }

  handleBluePoint() {
    request.put(
      'http://localhost:3000/api/game/' + this.state.gameId + '/set/' + this.state.setId,
      { qs: {
        player: 'blue'
      }
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('Response body', body);
        }
      }
    );
  }

  startGame() {
    const that = this;
    request.post(
      'http://localhost:3000/api/game',
      { json: {
        player: [that.state.red, that.state.blue],
        table: 'this.state.table'
      } },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          // We update the state with the new gameId
          // We bind the game object from firebase with the state
          const gameBind = fb.syncState('games/' + body, {
            context: that,
            state: 'game',
            asArray: false
          });
          that.setState({
            gameId: body,
            gameBind: gameBind
          });

          // We create the first set...
          request.post(
            'http://localhost:3000/api/game/' + body,
            { json: {
              red: that.state.red,
              blue: that.state.blue,
              serves: 'red'
            } },
            function(error, response1, body1) {
              if (!error && response1.statusCode === 200) {
                // We update the state with the new setId
                // We bind the set object from firebase with the state
                const setBind = fb.syncState('sets/' + body1, {
                  context: that,
                  state: 'set',
                  asArray: false
                });
                that.setState({
                  setId: body1,
                  setBind: setBind,
                  currentSet: 0
                });
              }
            }
          );
        }
      }
    );
  }

  endGame() {
    fb.removeBinding(this.state.gameBind);
    fb.removeBinding(this.state.setBind);
    this.setState({
      inGame: false,
      gameId: null,
      gameBind: null,
      setId: null,
      setBind: null,
      redReady: false,
      blueReady: false
    });
    this.props.endGame();
  }

  componentDidUpdate() {
    if ((this.state.gameId === null)
    && (this.state.inGame === false)
    && this.state.redReady
    && this.state.blueReady) {
      this.startGame();
      this.setState({inGame: true});
    }
  }


  render() {
    const red = this.state.red;
    const blue = this.state.blue;
    const game = this.state.game;
    const set = this.state.set;
    const gameId = this.state.gameId;
    const redReady = this.state.redReady;
    const blueReady = this.state.blueReady;

    return (
      <div>
        {gameId === null ? (
          <div>
            <NewGame
              red={red}
              blue={blue}
              redReady={redReady}
              blueReady={blueReady}
              handleRedChange={this.handleRedPlayerChange}
              handleBlueChange={this.handleBluePlayerChange}
              handleRedConfirm={this.handleRedPlayerConfirm}
              handleBlueConfirm={this.handleBluePlayerConfirm}
            />
          </div>
        ) : (
          <div>
            <Game
              red={red}
              blue={blue}
              game={game}
              set={set}
              handleRedPoint={this.handleRedPoint}
              handleBluePoint={this.handleBluePoint}
              endGame={this.endGame}
            />
          </div>
        )}
      </div>
    );
  }
}

GameContainer.propTypes = {
  endGame: React.PropTypes.func.isRequired
};
