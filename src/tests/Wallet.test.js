import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen, waitFor } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import userEvent from '@testing-library/user-event';
import mockCurrencies from './helpers/mockCurrencies';
import mockData from './helpers/mockData';
import mockExpense from './helpers/mockExpense';

const INITIAL_STATE = {
  wallet: {
    currencies: mockCurrencies,
    expenses: mockExpense,
    editor: false,
    idToEdit: 0,
    expenseToEdit: {},
  },
};

describe('Wallet page tests', () => {
  it('Should render all inputs and a button', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();
  });

  it('Should add a expense after filling the inputs and clicking the button', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(ENDPOINT));

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, mockExpense[0].value);
    userEvent.type(descriptionInput, mockExpense[0].description);
    userEvent.click(addExpenseBtn);

    expect(
      await screen.findByRole('cell', { name: '26.00' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', { name: mockExpense[0].description })
    ).toBeInTheDocument();
  });

  it('Should be able to edit an expense when "Editar" button is clicked', async () => {
    const INITIAL_EDIT_STATE = {
      wallet: {
        ...INITIAL_STATE.wallet,
        editor: true,
        expenseToEdit: mockExpense[0],
      },
    }
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_EDIT_STATE });

    const editBtn = screen.getAllByTestId('edit-btn');
    userEvent.click(editBtn[0]);

    const saveEditBtn = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(saveEditBtn).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');

    userEvent.type(valueInput, '21');
    userEvent.type(descriptionInput, 'Vinte e um doláres');
    userEvent.click(saveEditBtn);

    expect(saveEditBtn).not.toHaveTextContent('Editar despesa');

    expect(
      await screen.findByRole('cell', { name: '21.00' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('cell', { name: /vinte e um doláres/i })
    ).toBeInTheDocument();
  });

  it('Should delete an expense when "Excluir" button is clicked', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const deleteBtn = screen.getAllByTestId('delete-btn');
    expect(deleteBtn[0]).toBeInTheDocument();

    const expenseDescription = screen.queryByRole('cell', {
      name: /vinte/i
    });
    expect(expenseDescription).toBeInTheDocument();

    userEvent.click(deleteBtn[0]);
    expect(expenseDescription).not.toBeInTheDocument();
  });

  it('Should not render the currencies if the api request fails', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return Promise.reject('error')
    });
    
    renderWithRouterAndRedux(<Wallet />);

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput.options).toHaveLength(0);
  });
});
