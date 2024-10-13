import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpdateSchedule from './UpdateSchedule';
import axios from 'axios';

// Mocking the axios module
jest.mock('axios');

const renderComponent = (state) => {
  return render(
    <BrowserRouter>
      <UpdateSchedule />
    </BrowserRouter>,
    {
      initialEntries: [{ state }],
    }
  );
};

describe('UpdateSchedule Component', () => {
  const initialState = {
    scheduleId: '123',
    address: '123 Main St',
    district: 'Colombo',
    dateTime: '2024-10-15T10:00',
  };

  test('renders form with initial values', () => {
    renderComponent(initialState);

    expect(screen.getByLabelText(/Address:/i)).toHaveValue(initialState.address);
    expect(screen.getByLabelText(/District:/i)).toHaveValue(initialState.district);
    expect(screen.getByLabelText(/Date and Time:/i)).toHaveValue(initialState.dateTime);
  });

  test('updates schedule successfully', async () => {
    axios.put.mockResolvedValueOnce({ data: { message: 'Schedule updated successfully!' } });
    
    renderComponent(initialState);

    fireEvent.change(screen.getByLabelText(/Address:/i), { target: { value: '456 Another St' } });
    fireEvent.change(screen.getByLabelText(/District:/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/Date and Time:/i), { target: { value: '2024-10-16T11:00' } });

    fireEvent.click(screen.getByText(/Update Schedule/i));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(`http://localhost:8070/schedule/updateschedule/${initialState.scheduleId}`, {
        address: '456 Another St',
        district: 'Gampaha',
        dateTime: '2024-10-16T11:00',
      });
      expect(screen.getByText(/Schedule updated successfully!/i)).toBeInTheDocument();
    });
  });

  test('displays error message on update failure', async () => {
    axios.put.mockRejectedValueOnce(new Error('Failed to update schedule'));
    
    renderComponent(initialState);

    fireEvent.click(screen.getByText(/Update Schedule/i));

    await waitFor(() => {
      expect(screen.getByText(/Failed to update schedule. Please try again./i)).toBeInTheDocument();
    });
  });

  test('shows validation error if address is empty', async () => {
    renderComponent(initialState);

    fireEvent.change(screen.getByLabelText(/Address:/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Update Schedule/i));

    expect(screen.getByLabelText(/Address:/i)).toHaveAttribute('required');
    expect(screen.getByText(/Address:/i)).toBeTruthy();
  });
});
