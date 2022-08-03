import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosWallet, IoMdPerson } from 'react-icons/io';
import '../styles/Header.css';
import { Redirect } from 'react-router-dom';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const totalValue = expenses.reduce(
      (acc, curr) => acc + curr.exchangeRates[curr.currency].ask * curr.value,
      0,
    );
    return totalValue.toFixed(2);
  };

  render() {
    const { email } = this.props;
    if (email === '') return <Redirect to="/login" />;
    return (
      <header className="Header">
        <div className="Title">
          <IoIosWallet />
          <h1>Wallet.</h1>
        </div>
        <div className="Header-Informations">
          <div>
            <span>R$</span>
            <p data-testid="total-field">{this.totalExpenses()}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
          <div>
            <IoMdPerson />
            <p data-testid="email-field">{email}</p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.defaultProps = {
  email: '',
};

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
