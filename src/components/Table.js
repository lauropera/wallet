import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import {
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction,
} from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <div className="Table-Container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({
                id,
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <div className="Buttons-Container">
                      <button
                        id={ id }
                        type="button"
                        onClick={ () => editExpense(id) }
                        data-testid="edit-btn"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        id={ id }
                        type="button"
                        onClick={ () => deleteExpense(id) }
                        data-testid="delete-btn"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
