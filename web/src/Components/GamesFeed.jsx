import React from 'react';
import { Grid, Card, CardText, Cell, FABButton, Icon } from 'react-mdl';
import fb from '../firebase';

export default class GamesFeed extends React.Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.state = {
      juegos: [],
      gamesBind: null
    };
  }

  newGame() {
    this.props.newGame();
  }

  componentWillMount() {
    /*
     * Here we call 'bindToState', which will update
     * our local 'juegos' state whenever our 'games'
     * Firebase endpoint changes.
     */

    const gamesBind = fb.bindToState('games', {
      context: this,
      state: 'juegos',
      asArray: true,
      queries: {
        limitToLast: 10
      }
    });
    this.setState({
      gamesBind: gamesBind
    });
  }

  componentWillUnmount() {
    fb.removeBinding(this.state.gamesBind);
    this.setState({
      gamesBind: null
    });
  }

  render() {
    let GameCards = this.state.juegos.reverse().map((game, index) => {
      let player;
      let PlayersScore = [];
      for (player in game.players) {
        let set;
        let playerScore = [];
        let winner = game.players[player];
        for (set in game.sets) {
          if (game.sets[set] === player) {
            playerScore.push(set);
          }
        }

        // QUICK FIX, IF PLAYER HAS 2 SETS IT IS MARKED AS winner
        if (playerScore.length >= 2) {
          winner = true;
        }

        const pings = playerScore.map((playerSet) => {
          return (
            <svg key={playerSet} height="60" width="60" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="25" fill={(winner ? 'gold' : 'white')} />
            </svg>
          );
        });
        PlayersScore.push(
          <Cell key={player} className={'gameFeedCard'} component={Card} col={6}>
            <CardText style={{width: '100%', textAlign: 'center'}}
              className={(winner ? 'winner' : 'loser')}>
              <h1>{player}</h1>
              {pings}
            </CardText>
            {/* <CardActions style={{width: '100%', textAlign: 'center'}}>
              <Button>{game.red}</Button>
            </CardActions> */}
          </Cell>
        );
      }
      return (
        <Grid key={index} component="section" className="section--center" shadow={0} noSpacing>
          { PlayersScore }
        </Grid>
      );
    });

    return (
      <div>
        <FABButton ripple colored accent className="mdl-shadow--4dp"
          onClick={this.newGame} id="add">
          <Icon name="add" />
          <span className="visuallyhidden">Add</span>
        </FABButton>
        <div className="react-mdl-layout__tab-panel">
          { GameCards }
        </div>
      </div>
    );
  }
}

GamesFeed.propTypes = {
  newGame: React.PropTypes.func.isRequired
};
