import React from 'react';
import { Content } from 'react-mdl';
import GamesFeed from './GamesFeed.jsx';
import GameContainer from './GameContainer.jsx';
import fb from '../firebase';

export default class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      juegos: [],
      isInGame: false
    };
  }

  newGame() {
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
      <Content component="main" className="react-mdl-layout__tab-panel"
        style={{backgroundColor: '#BDBDBD', color: '#fff'}} >
        {isInGame ? (
          <div>
            <GameContainer endGame={this.endGame} />
          </div>
        ) : (
          <div>
            <GamesFeed newGame={this.newGame} />
          </div>
        )}
      </Content>
    );
  }
}
