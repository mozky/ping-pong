import React from 'react';
import { Grid, Cell, CardText, Card, FABButton, Icon } from 'react-mdl';
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
      return (
        <Grid key={index} component="section" className="section--center" shadow={0} noSpacing>
          <Cell className={'gameFeedCard'} component={Card} col={6}
            style={{backgroundColor: '#EF5350'}}>
            <CardText style={{width: '100%', textAlign: 'center'}}>
              <h1>{game.redSetsScore}</h1>
              <h3>{game.red}</h3>
            </CardText>
            {/* <CardActions style={{width: '100%', textAlign: 'center'}}>
              <Button>{game.red}</Button>
            </CardActions> */}
          </Cell>
          <Cell className={'game-feed-card'} component={Card} col={6}
            style={{backgroundColor: '#5C6BC0'}}>
            <CardText style={{width: '100%', textAlign: 'center'}}>
              <h1>{game.blueSetsScore}</h1>
              <h3>{game.blue}</h3>
            </CardText>
            {/* <CardActions style={{width: '100%', textAlign: 'center'}}>
              <Button>{game.blue}</Button>
            </CardActions> */}
          </Cell>
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
