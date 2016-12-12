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
      asArray: true
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
    let GameCards = this.state.juegos.map((game, index) => {
      let player;
      let PlayersScore = [];
      for (player in game.players) {
        PlayersScore.push(
          <Cell key={player} className={'gameFeedCard'} component={Card} col={6}
            style={{backgroundColor: '#EF5350'}}>
            <CardText style={{width: '100%', textAlign: 'center'}}>
              <h1>{player}</h1>
              {/* <h3>{game.red}</h3> */}
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
