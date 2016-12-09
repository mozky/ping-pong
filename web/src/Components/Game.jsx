import React from 'react';
import { Grid, Cell, CardText, CardActions, Button, Card } from 'react-mdl';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.redPoint = this.redPoint.bind(this);
    this.bluePoint = this.bluePoint.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  redPoint() {
    this.props.handleRedPoint();
  }

  bluePoint() {
    this.props.handleBluePoint();
  }

  endGame() {
    this.props.endGame();
  }

  render() {
    if (this.props.game.redScore !== undefined) {
      return (
        <Grid component="section" className="section--center" shadow={0} noSpacing>
          <Cell component="header" col={3} tablet={3} phone={4}
            style={{backgroundColor: '#EF5350'}}>
            <Button onClick={this.redPoint}
              style={{fontSize: '3em', color: '#fff', width: '100%', height: '100%'}}>
              +
            </Button>
          </Cell>
          <Cell className={'REMOVE'} component={Card} col={6} tablet={6} phone={4}
            style={{backgroundColor: '#616161', color: '#fff'}}>
            <CardText style={{textAlign: 'center', fontStretch: 'expanded'}}>
              <h1>{this.props.game.redScore} &nbsp;&nbsp;&nbsp; {this.props.game.blueScore}</h1>
              <h3>{this.props.red} vs {this.props.blue}</h3>
            </CardText>
            <CardActions style={{textAlign: 'center'}}>
              <Button onClick={this.endGame} style={{color: '#fff'}}>End Game</Button>
            </CardActions>
          </Cell>
          <Cell component="header" col={3} tablet={3} phone={4}
            style={{backgroundColor: '#5C6BC0'}}>
            <Button onClick={this.bluePoint}
              style={{fontSize: '3em', color: '#fff', width: '100%', height: '100%'}}>
              +
            </Button>
          </Cell>
        </Grid>
        /* <div>


        </div> */
      );
    }
    return (
      <div>
        <h1>{this.props.red} vs {this.props.blue}</h1>
        <h1>TODO: Poner Spinner</h1>
      </div>
    );
  }
}

Game.propTypes = {
  red: React.PropTypes.string.isRequired,
  blue: React.PropTypes.string.isRequired,
  game: React.PropTypes.object,
  redScore: React.PropTypes.string,
  blueScore: React.PropTypes.string,
  handleRedPoint: React.PropTypes.func.isRequired,
  handleBluePoint: React.PropTypes.func.isRequired,
  endGame: React.PropTypes.func.isRequired
};
