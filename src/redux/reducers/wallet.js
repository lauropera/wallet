import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_CURRENCIES,
  SAVE_NEW_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expenseToEdit: {},
};

const updatedExpenses = (allExpenses, idToEdit, edited) => {
  allExpenses[idToEdit] = edited;
  return allExpenses;
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
        },
      ],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
      expenseToEdit: state.expenses.find(({ id }) => id === action.payload),
    };

  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: [
        ...updatedExpenses(state.expenses, state.idToEdit, action.payload),
      ],
      idToEdit: 0,
    };

  default:
    return state;
  }
}

export default wallet;
