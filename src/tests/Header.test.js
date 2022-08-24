import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import mockExpense from './helpers/mockExpense';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    expenses: mockExpense,
  },
};

describe('Header component tests', () => {
  it('Expect to render the user email', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const emailText = screen.getByTestId('email-field');

    expect(emailText).toBeInTheDocument();
    expect(emailText).toHaveTextContent('teste@teste.com');
  });

  it('Expect to have "BRL" currency by default', () => {
    renderWithRouterAndRedux(<Header />);

    const currencyText = screen.getByTestId('header-currency-field');

    expect(currencyText).toBeInTheDocument();
    expect(currencyText).toHaveTextContent('BRL');
  });

  it('Expect to render the total sum of all expenses', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const totalValueText = screen.getByTestId('total-field');

    expect(totalValueText).toBeInTheDocument();
    expect(totalValueText).toHaveTextContent('144.09');
  });
});
