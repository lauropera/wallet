import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoIosWallet, IoIosMail, IoMdKey } from 'react-icons/io';
import { userLogin as loginAction } from '../redux/actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      buttonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const MIN_PASS_LENGTH = 6;
    const { email } = this.state;
    this.setState({ [target.name]: target.value });
    if (target.id === 'password') {
      this.setState({
        buttonDisabled:
          !(target.value.length >= MIN_PASS_LENGTH
          && this.validateEmail(email)),
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userLogin, history } = this.props;
    const { email } = this.state;
    userLogin(email);
    history.push('/carteira');
  };

  validateEmail = (email) => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(mailFormat);
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="Login-Form">
        <div className="Login-Title">
          <IoIosWallet />
          <h1>Wallet.</h1>
        </div>
        <label htmlFor="email">
          Email
          <IoIosMail className="Icon" />
          <input
            type="email"
            name="email"
            id="email"
            onChange={ this.onInputChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha
          <IoMdKey className="Icon" />
          <input
            type="password"
            id="password"
            onChange={ this.onInputChange }
            data-testid="password-input"
          />
        </label>
        <button type="submit" disabled={ buttonDisabled }>
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(loginAction(email)),
});

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
