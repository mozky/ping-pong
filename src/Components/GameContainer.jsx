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
      gameId: null,
      gameBind: null,
      red: 'guest',
      blue: 'guest',
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

  handleRedPoint(set) {
    set = 0;
    this.setState({
      game: {
        sets[set]: {
          redScore: this.state.game.sets[set].redScore + 1
        }
      }
    });
  }

  handleBluePoint(set) {
    set = 0;
    this.setState({
      game: {
        sets[set]: {
          blueScore: this.state.game.sets[set].blueScore + 1
        }
      }
    });
  }

  startGame() {
    const that = this;
    request.post(
      'http://localhost:3000/api/game',
      { json: {
        red: this.state.red,
        blue: this.state.blue,
        redSetsScore: 0,
        blueSetsScore: 0,
        sets: [
          {
            redScore: 0,
            blueScore: 0
          },
          {
            redScore: 0,
            blueScore: 0
          },
          {
            redScore: 0,
            blueScore: 0
          }
        ]
      }
      },
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
        }
      }
    );
  }

  endGame() {
    fb.removeBinding(this.state.gameBind);
    this.setState({
      inGame: false,
      gameId: null,
      gameBind: null,
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