import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pin: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.onSubmit(this.state.email, this.state.pin);
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleEmailChange} />
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
