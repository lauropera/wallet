import fetchCurrencies from '../../services/fetchCurrencies';

export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_NEW_EXPENSE = 'SAVE_NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const saveNewExpense = (payload) => ({
  type: SAVE_NEW_EXPENSE,
  payload,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await fetchCurrencies();
  delete currencies.USDT;
  dispatch(saveCurrencies(Object.keys(currencies)));
};

export const newExpense = (expense) => async (dispatch) => {
  const currencies = await fetchCurrencies();
  dispatch(saveNewExpense({
    ...expense,
    exchangeRates: currencies,
  }));
};

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const saveEditedExpense = (payload) => ({
  type: SAVE_EDITED_EXPENSE,
  payload,
});
