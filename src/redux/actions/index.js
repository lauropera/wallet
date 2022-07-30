import getCurrencies from '../../services/getCurrencies';

export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_NEW_EXPENSE = 'SAVE_NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

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

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const currencies = await getCurrencies();
    const dataWithoutUSDT = Object.entries(currencies)
      .filter((elem) => elem[0] !== 'USDT');
    const newData = Object.fromEntries(dataWithoutUSDT);
    dispatch(saveCurrencies(Object.keys(newData)));
  } catch (error) {
    return error;
  }
};

export const newExpense = (expense) => async (dispatch) => {
  try {
    const currencies = await getCurrencies();
    dispatch(saveNewExpense({
      ...expense,
      exchangeRates: currencies,
    }));
  } catch (error) {
    return error;
  }
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
