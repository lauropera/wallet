import React from 'react';
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
  render() {
    return (
      <LoginForm { ...this.props } />
    );
  }
}

export default Login;
