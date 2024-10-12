import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CalculatePayment from './CalculatePayment';

const mockAxios = new MockAdapter(axios);

const renderComponent = (state) => {
  return render(
    <BrowserRouter>
      <CalculatePayment />
    </BrowserRouter>,
    {
      initialEntries: [{ state }],
    }
  );
};

describe('CalculatePayment Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock adapter after each test
  });

  test('calculates and displays total amount correctly when weight is provided', () => {
    const state = { garbageId: '123', weight: 5 };
    renderComponent(state);

    expect(screen.getByText(/Garbage ID: 123/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 5 Kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount: Rs.50.00/i)).toBeInTheDocument(); // 5 * 10 = 50
  });

  test('shows error message when garbageId is missing', async () => {
    const state = { weight: 5 }; // Missing garbageId
    renderComponent(state);

    expect(screen.getByText(/No payment details available/i)).toBeInTheDocument();
  });

  test('successfully adds payment and navigates when valid details are provided', async () => {
    const state = { garbageId: '123', weight: 5 };
    mockAxios.onPost('http://localhost:8070/calculatepayment/addpaymentdetails').reply(200, { success: true });

    renderComponent(state);
    
    fireEvent.click(screen.getByText(/OK/i));

    expect(await screen.findByText(/Payment added successfully/i)).toBeInTheDocument();
    expect(mockAxios.history.post.length).toBe(1); // Ensure POST request was made
  });

  test('shows error message when adding payment fails', async () => {
    const state = { garbageId: '123', weight: 5 };
    mockAxios.onPost('http://localhost:8070/calculatepayment/addpaymentdetails').reply(500);

    renderComponent(state);

    fireEvent.click(screen.getByText(/OK/i));

    expect(await screen.findByText(/Failed to add payment. Please try again later./i)).toBeInTheDocument();
  });
});
