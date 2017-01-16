import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pin: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePinChange(event) {
    this.setState({pin: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A form was submitted');
    this.props.onSubmit(this.state.username, this.state.pin);
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleUsernameChange} />
        <input
          type="password"
          placeholder="password"
          value={this.state.pin}
          onChange={this.handlePinChange} />
        <button type="submit">Login</button>
        <p className="message">
          Not registered?&nbsp;
          <a href="#" onClick={this.props.dismiss}>Create an account</a>
        </p>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  dismiss: React.PropTypes.func
};
