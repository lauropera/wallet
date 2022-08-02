import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';

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
    return (
      <header className="Header">
        <h1>Wallet</h1>
        <div className="Header-Informations">
          <p data-testid="email-field">{email}</p>
          <div>
            <p data-testid="total-field">{this.totalExpenses()}</p>
            <p data-testid="header-currency-field">BRL</p>
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
