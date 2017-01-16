import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      pin: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePinChange(event) {
    this.setState({pin: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A form was submitted');
    this.props.onSubmit(this.state.username, this.state.email, this.state.pin);
  }

  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleUsernameChange} />
        <input
          type="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange} />
        <input type="password" placeholder="password" />
        <input
          type="password"
          placeholder="repeat password"
          value={this.state.pin}
          onChange={this.handlePinChange} />
        <button type="submit">Register</button>
        <p className="message">
          Already registered?&nbsp;
          <a href="#" onClick={this.props.dismiss}>Sign In</a>
        </p>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  dismiss: React.PropTypes.func
};
