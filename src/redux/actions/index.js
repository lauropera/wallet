import getCurrencies from '../../services/getCurrencies';

export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const saveNewExpense = (payload) => ({
  type: SAVE_EXPENSE,
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
