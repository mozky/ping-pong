import React from 'react';
import { Content } from 'react-mdl';
import GamesFeed from './GamesFeed.jsx';
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
        <GamesFeed />
      </Content>
    );
  }
}
