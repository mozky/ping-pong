import React from 'react';
import styles from './styles.scss';
import Navbar from './Components/Navbar/Navbar.jsx';
import '../vendor/material.min.js';
import '../vendor/material.min.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        <Navbar />
      </div>
    );
  }
}
