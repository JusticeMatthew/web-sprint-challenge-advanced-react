import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
  render(<CheckoutForm />);
  expect(
    screen.getByText('Checkout Form', { exact: true }),
  ).toBeInTheDocument();
});

test('form shows success message on submit with form details', async () => {
  render(<CheckoutForm />);
  // DOM elements
  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const address = screen.getByLabelText(/address/i);
  const city = screen.getByLabelText(/city/i);
  const state = screen.getByLabelText(/state/i);
  const zip = screen.getByLabelText(/zip/i);

  const submitButt = screen.getByRole('button', /checkout/i);

  // Hooman simulation
  userEvent.type(firstName, 'Jesse');
  userEvent.type(lastName, 'Mcree');
  userEvent.type(address, '1200 High noon st');
  userEvent.type(city, 'orlando');
  userEvent.type(state, 'FL');
  userEvent.type(zip, '12345');

  userEvent.click(submitButt);

  const success = await screen.findByTestId('successMessage');

  expect(success).toBeInTheDocument();
});
