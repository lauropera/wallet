import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    this.saveCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  saveCurrencies = async () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            name="value"
            id="valueInput"
            min="0"
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <select
          name="currency"
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {currencies.map((curr) => (
            <option key={ curr }>{curr}</option>
          ))}
        </select>
        <select
          name="method"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select name="tag" onChange={ this.handleChange } data-testid="tag-input">
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
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <button type="submit">Adicionar despesa</button>
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
