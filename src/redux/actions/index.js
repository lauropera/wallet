import getCurrencies from '../../services/getCurrencies';

export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const IS_FETCHING = 'IS_FETCHING';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const currencies = await getCurrencies();
    const currsWithoutUSDT = Object.keys(currencies)
      .filter((curr) => curr !== 'USDT');
    dispatch(saveCurrencies(currsWithoutUSDT));
  } catch (error) {
    return error;
  }
};
