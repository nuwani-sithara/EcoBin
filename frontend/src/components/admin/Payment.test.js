import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Payment from './Payment';
import axios from 'axios';

// Mocking the axios module
jest.mock('axios');

// Create a function to render the component
const renderComponent = (state) => {
  return render(
    <BrowserRouter>
      <Payment />
    </BrowserRouter>,
    {
      initialEntries: [{ state }],
    }
  );
};

describe('Payment Component', () => {
  const initialState = {
    garbageId: '001',
    weight: 5,
  };

  test('renders payment details with calculated amount', () => {
    renderComponent(initialState);

    expect(screen.getByText(/Payment Details/i)).toBeInTheDocument();
    expect(screen.getByText(`Garbage ID`)).toBeInTheDocument();
    expect(screen.getByText(initialState.garbageId)).toBeInTheDocument();
    expect(screen.getByText(initialState.weight)).toBeInTheDocument();
    expect(screen.getByText(`Amount`)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument(); // 5kg * 10 = 50
  });

  test('successfully deletes payment details when status is completed', async () => {
    axios.delete.mockResolvedValueOnce({ data: { message: 'Deleted successfully' } });

    renderComponent(initialState);

    // Change status to Completed
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Completed' } });
    
    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8070/garbage/deletegarbageDetails/${initialState.garbageId}`);
      expect(screen.getByText(/Payment details deleted successfully!/i)).toBeInTheDocument();
    });
  });

  test('does not delete payment details if status is not completed', async () => {
    renderComponent(initialState);
    
    fireEvent.click(screen.getByText(/Delete/i));

    expect(await screen.findByText(/Cannot delete payment details unless the status is completed./i)).toBeInTheDocument();
    expect(axios.delete).not.toHaveBeenCalled();
  });

  test('shows error message when delete fails', async () => {
    axios.delete.mockRejectedValueOnce(new Error('Failed to delete'));
    
    renderComponent(initialState);

    // Change status to Completed
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Completed' } });
    
    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(screen.getByText(/Failed to delete payment details. Please try again./i)).toBeInTheDocument();
    });
  });
});









