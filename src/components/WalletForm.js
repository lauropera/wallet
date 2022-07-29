import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.saveCurrencies();
  }

  saveCurrencies = async () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  };

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input type="number" id="valueInput" data-testid="value-input" />
        </label>
        <select data-testid="currency-input">
          {currencies.map((curr) => (
            <option key={ curr }>{curr}</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <label htmlFor="descInput">
          Descrição:
          <input
            type="text"
            id="descInput"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
