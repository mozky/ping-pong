import React from 'react';
import { Header, Navigation } from 'react-mdl';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logedIn: false};
  }
  render() {
    return (
      <Header style={{backgroundColor: '#424242'}} title={
        <span><strong>ping-pong</strong><small style={{color: '#ddd'}}> - beta</small></span>
      }>
        <Navigation>
          <a href="#">Stats</a>
          <a href="#">Backroom</a>
          <a href="#">Contact</a>
        </Navigation>
      </Header>
    );
  }
}
