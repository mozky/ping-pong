import React from 'react';
import { Drawer, Navigation } from 'react-mdl';

export default class SidePanel extends React.Component {
  render() {
    return (
      <Drawer title="Side Panel">
        <Navigation>
          <a href="">Link</a>
          <a href="">Link</a>
          <a href="">Link</a>
          <a href="">Link</a>
        </Navigation>
      </Drawer>
    );
  }
}
