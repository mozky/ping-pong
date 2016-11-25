import React from 'react';
import { Header, Navigation } from 'react-mdl';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logedIn: false};
  }
  render() {
    return (
      <Header title={
        <span><strong>ping-pong</strong><small style={{ color: '#ddd' }}> - alpha</small></span>
      }>
        <Navigation>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </Navigation>
      </Header>
    );
  }
}
