import React from 'react';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logedIn: false};
  }
  render() {
    return (
      <Layout fixedHeader>
        <Header title={
          <span><strong>Ping pong</strong><small style={{ color: '#ddd' }}> - alpha</small></span>
        }>
          <Navigation>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
          </Navigation>
        </Header>
        <Drawer title="Title">
          <Navigation>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
          </Navigation>
        </Drawer>
        <Content />
      </Layout>
    );
  }
}
