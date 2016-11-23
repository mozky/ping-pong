import React from 'react';
import styles from './styles.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        Ping-pong
      </div>
    );
  }
}
