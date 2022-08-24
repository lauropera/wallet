import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";

describe('Login page tests', () => {
  it('Should render two inputs in "/" route', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/')

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Expects that the "Entrar" button is disabled when the page loads', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'algumacoisa')
    expect(emailInput).toHaveValue('algumacoisa');

    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
  });

  it('Expects to redirect to "/carteira" when the login has been successfully done', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'senhatop');

    const btn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
