import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

class Login extends React.Component {
  render() {
    return (
      <main className="Login-Container">
        <LoginForm { ...this.props } />
      </main>
    );
  }
}

export default Login;
