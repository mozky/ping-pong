import React from 'react';
import '../vendor/material.min.js';
import '../vendor/material.min.css';
import { Layout } from 'react-mdl';
import Navbar from './Components/Navbar.jsx';
// import SidePanel from './Components/SidePanel.jsx';
import MainBody from './Components/MainBody.jsx';
import './styles.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className="pp-app">
        <Layout fixedHeader>
          <Navbar />
          {/* <SidePanel /> */}
          <MainBody />
        </Layout>
      </div>
    );
  }
}
