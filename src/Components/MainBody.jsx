import React from 'react';
import { Content, Button } from 'react-mdl';
import GamesFeed from './GamesFeed.jsx';
import GameContainer from './GameContainer.jsx';
import fb from '../firebase';

export default class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      juegos: [],
      isInGame: true
    };
  }

  startGame() {
    this.setState({isInGame: true});
  }

  endGame() {
    this.setState({isInGame: false});
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
    const isInGame = this.state.isInGame;

    return (
      <Content component="main" className="react-mdl-layout__tab-panel">
        {isInGame ? (
          <div>
            <Button onClick={this.endGame}>Games Feed</Button>
            <GameContainer />
          </div>
        ) : (
          <div>
            <Button onClick={this.startGame}>Start Game</Button>
            <GamesFeed />
          </div>
        )}
      </Content>
    );
  }
}
