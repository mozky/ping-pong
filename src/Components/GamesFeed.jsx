import React from 'react';
import { Grid, Cell, CardText, CardActions, IconButton, Menu,
  MenuItem, Button, Card } from 'react-mdl';
import fb from '../firebase';

export default class GamesFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      juegos: [],
      gamesBind: null
    };
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
    var GameCards = this.state.juegos.map((game, index) => {
      return (
        <Grid key={index} component="section" className="section--center" shadow={0} noSpacing>
          <Cell component={Card} col={12}>
            <CardText>
              <h4> Game #{index}</h4>
              <p>Player 1: { game.p1 }</p>
              <p>Player 2: { game.p2 }</p>
            </CardText>
            <CardActions>
              <Button href="#">See full game</Button>
            </CardActions>
          </Cell>
          <IconButton name="more_vert" id="btn1" ripple />
          <Menu target="btn1" align="right" valign="bottom">
            <MenuItem>Lorem</MenuItem>
            <MenuItem disabled>Ipsum</MenuItem>
            <MenuItem>Dolor</MenuItem>
          </Menu>
        </Grid>
      );
    });

    return (
      <div>
        { GameCards }
      </div>
    );
  }
}
