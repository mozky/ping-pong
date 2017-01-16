import React from 'react';
import $ from 'jquery';
import '../vendor/material.min.js';
import '../vendor/material.min.css';
import { Layout } from 'react-mdl';
import Navbar from './Components/Navbar.jsx';
// import SidePanel from './Components/SidePanel.jsx';
import MainBody from './Components/MainBody.jsx';
import LoginForm from './Components/LoginForm.jsx';
import RegisterForm from './Components/RegisterForm.jsx';
import fb from './firebase';
import './styles.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
    this.handleRegisterAttempt = this.handleRegisterAttempt.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.state = {
      user: null
    };
  }

  handleLoginAttempt(email, pin) {
    const that = this;
    console.log('handleLoginAttempt', email, pin);
    const authHandler = function(error, user) {
      if (error) console.log(error);
      console.log('User authenticated', user);
      that.setState({
        user: user
      });
    };

    fb.authWithPassword({
      email: email,
      password: pin
    }, authHandler);
  }

  handleRegisterAttempt(username, email, pin) {
    console.log('handleRegisterAttempt', username, email, pin);
    const userHandler = function(error, user) {
      if (error) console.log(error);
      console.log('User created', user);
      user.updateProfile({
        displayName: username
      }).then(function() {
        console.log('Username updated', username);
      }, function(error) {
        console.log(error);
      });
    };

    fb.createUser({
      email,
      password: pin
    }, userHandler);
  }

  handleCardChange() {
    $('form').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 'slow');
  }

  render() {
    if (this.state.user) {
      return (
        <div className="pp-app">
          <Layout fixedHeader>
            <Navbar user={this.state.user} />
            {/* <SidePanel /> */}
            <MainBody />
          </Layout>
        </div>
      );
    }
    return (
      <div className="unauthorized">
        <RegisterForm
          className="form"
          onSubmit={this.handleRegisterAttempt}
          dismiss={this.handleCardChange}
        />
        <LoginForm
          className="form"
          onSubmit={this.handleLoginAttempt}
          dismiss={this.handleCardChange}
        />
      </div>
    );
  }
}
