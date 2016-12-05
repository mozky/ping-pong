import React from 'react';
import { Button } from 'react-mdl';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.redPoint = this.redPoint.bind(this);
    this.bluePoint = this.bluePoint.bind(this);
  }

  redPoint() {
    this.props.handleRedPoint();
  }

  bluePoint() {
    this.props.handleBluePoint();
  }

  render() {
    if (this.props.game.redScore !== undefined) {
      return (
        <div>
          <h1>{this.props.red} vs {this.props.blue}</h1>
          <h1>{this.props.game.redScore} - {this.props.game.blueScore}</h1>
          <Button onClick={this.redPoint}>Red +</Button>
          <Button onClick={this.bluePoint}>Blue +</Button>
        </div>
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
  handleBluePoint: React.PropTypes.func.isRequired
};
