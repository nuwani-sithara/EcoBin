import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ScheduleCollection from '../components/ScheduleCollection'; // Adjust path based on your project structure
import '@testing-library/jest-dom';
import 'react-datepicker/dist/react-datepicker.css';

// Mock fetch globally for the test
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('ScheduleCollection Component', () => {
  const mockNavigate = jest.fn();
  const mockLocationState = {
    state: {
      items: {
        plastic: { selected: true, weight: 2.0, total: 100 },
      },
      totalWeight: 2.0,
      totalPrice: 100.0,
      paymentMethod: 'Cash',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form elements correctly', () => {
    render(
      <MemoryRouter initialEntries={['/schedule-collection']}>
        <Routes>
          <Route
            path="/schedule-collection"
            element={<ScheduleCollection />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Check if the form elements are present
    expect(screen.getByText('Schedule a collections slot')).toBeInTheDocument();
    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(screen.getByText('District:')).toBeInTheDocument();
    expect(screen.getByText('Date & Time:')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('submits the form and calls the backend', async () => {
    render(
      <MemoryRouter initialEntries={['/schedule-collection']}>
        <Routes>
          <Route
            path="/schedule-collection"
            element={<ScheduleCollection />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Enter your address'), {
      target: { value: '123 Main St' },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Colombo' },
    });

    // Mock DatePicker input
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '10/19/2024 8:00 PM' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Confirm'));

    // Wait for the API call and form submission
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8070/api/recycle', expect.any(Object));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('shows an error when required fields are missing', async () => {
    render(
      <MemoryRouter initialEntries={['/schedule-collection']}>
        <Routes>
          <Route
            path="/schedule-collection"
            element={<ScheduleCollection />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Leave fields empty and try to submit
    fireEvent.click(screen.getByText('Confirm'));

    // Expect the error message or alert to be called
    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please go back and try again.')).toBeInTheDocument();
    });
  });
});
