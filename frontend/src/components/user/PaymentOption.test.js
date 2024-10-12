import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaymentOption from './PaymentOption';

const renderComponent = (state) => {
  return render(
    <BrowserRouter>
      <PaymentOption />
    </BrowserRouter>,
    {
      initialEntries: [{ state }],
    }
  );
};

describe('PaymentOption Component', () => {
  test('displays payment options and total amount correctly', () => {
    const state = { amount: 1000 };
    renderComponent(state);

    expect(screen.getByText(/Payment Options/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/Rs. 1000\.00/i)).toBeInTheDocument();
  });

  test('successfully submits online payment with card details', async () => {
    const state = { amount: 1000 };
    renderComponent(state);

    fireEvent.click(screen.getByLabelText(/Online Payment/i));
    fireEvent.change(screen.getByPlaceholderText(/Card Number/i), { target: { value: '1234567812345678' } });
    fireEvent.change(screen.getByPlaceholderText(/Expiry Date \(MM\/YYYY\)/i), { target: { value: '12/2025' } });
    fireEvent.change(screen.getByPlaceholderText(/CVV/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/OK/i));

    expect(screen.getByText(/Payment submitted successfully/i)).toBeInTheDocument(); // Assume success message shows up
  });

  test('handles payment submission error correctly', async () => {
    const state = { amount: 1000 };
    renderComponent(state);

    fireEvent.click(screen.getByLabelText(/Online Payment/i));
    fireEvent.change(screen.getByPlaceholderText(/Card Number/i), { target: { value: 'invalid-card-number' } });
    fireEvent.click(screen.getByText(/OK/i));

    expect(screen.getByText(/Error submitting payment/i)).toBeInTheDocument(); // Assume error message shows up
  });

  test('navigates to status page with correct payment details', () => {
    const state = { amount: 1000 };
    renderComponent(state);

    fireEvent.click(screen.getByLabelText(/Online Payment/i));
    fireEvent.change(screen.getByPlaceholderText(/Card Number/i), { target: { value: '1234567812345678' } });
    fireEvent.change(screen.getByPlaceholderText(/Expiry Date \(MM\/YYYY\)/i), { target: { value: '12/2025' } });
    fireEvent.change(screen.getByPlaceholderText(/CVV/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/OK/i));

    expect(window.location.pathname).toBe('/status'); // Ensure navigation to status page
  });
});
