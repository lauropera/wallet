import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrencies as getCurrenciesThunk,
  newExpense as newExpenseAction,
  saveEditedExpense as saveEditedExpenseAction,
} from '../redux/actions';
import '../styles/WalletForm.css';

const INITIAL_STATE = {
  id: 0,
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.saveCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveNewExpense, editor, editExpense, expenseToEdit } = this.props;
    console.log(editor);
    if (editor) {
      editExpense({ ...expenseToEdit, ...this.state, id: expenseToEdit.id });
    } else {
      saveNewExpense(this.state);
      this.setState(({ id }) => ({ ...INITIAL_STATE, id: id + 1 }));
    }
  };

  saveCurrencies = async () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="Wallet-Form">
        <div className="Value-Currency">
          <label htmlFor="valueInput">
            Valor
            <input
              type="number"
              name="value"
              id="valueInput"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies.map((curr) => (
                <option key={ curr }>{curr}</option>
              ))}
            </select>
          </label>
        </div>
        <label htmlFor="method">
          Pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="descInput">
          Descrição
          <input
            type="text"
            id="descInput"
            name="description"
            maxLength="180"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        {editor ? (
          <button type="submit">Editar despesa</button>
        ) : (
          <button
            type="submit"
            disabled={ !(value.length > 0 && description.length > 0) }
          >
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
  saveNewExpense: (expense) => dispatch(newExpenseAction(expense)),
  editExpense: (expense) => dispatch(saveEditedExpenseAction(expense)),
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  saveNewExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
