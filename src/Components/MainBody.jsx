import React from 'react';
import { Content, Grid, Cell, Icon, CardText, CardActions, IconButton, Menu,
  MenuItem, Button, Card } from 'react-mdl';
import fb from '../firebase';

export default class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      juegos: []
    };
  }

  componentWillMount() {
  /*
   * Here we call 'bindToState', which will update
   * our local 'juegos' state whenever our 'games'
   * Firebase endpoint changes.
   */

    fb.bindToState('games', {
      context: this,
      state: 'juegos',
      asArray: true
    });
  }

  render() {
    return (
      <Content component="main" className="react-mdl-layout__tab-panel">
        <Grid component="section" className="section--center" shadow={0} noSpacing>
          <Cell component="header" col={3} tablet={2} phone={4} >
            <Icon name="play_circle_filled" />
          </Cell>
          <Cell component={Card} col={9} tablet={6} phone={4}>
            <CardText>
              <h4>Features</h4>
              <p>{ this.state.juegos.length }</p>
            </CardText>
            <CardActions>
              <Button href="#">Read our features</Button>
            </CardActions>
          </Cell>
          <IconButton name="more_vert" id="btn1" ripple />
          <Menu target="btn1" align="right" valign="bottom">
            <MenuItem>Lorem</MenuItem>
            <MenuItem disabled>Ipsum</MenuItem>
            <MenuItem>Dolor</MenuItem>
          </Menu>
        </Grid>
        <Grid component="section" className="section--center" shadow={0} noSpacing>
          <Cell component={Card} col={12}>
            <CardText>
              <h4>Technology</h4>
              Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi c.
            </CardText>
            <CardActions>
              <Button href="#">Read our features</Button>
            </CardActions>
          </Cell>
          <IconButton name="more_vert" id="btn3" ripple />
          <Menu target="btn3" align="right" valign="bottom">
            <MenuItem>Lorem</MenuItem>
            <MenuItem disabled>Ipsum</MenuItem>
            <MenuItem>Dolor</MenuItem>
          </Menu>
        </Grid>
      </Content>
    );
  }
}
