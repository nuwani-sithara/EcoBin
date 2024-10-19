import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Summary from '../components/Summary';
import ScheduleCollection from '../components/ScheduleCollection'; // Assuming this is where navigation leads

// Mock data
const mockItems = {
  cardboard: { selected: true, weight: 1.0, total: 50.0 },
  newspaper: { selected: true, weight: 2.0, total: 20.0 },
  metals: { selected: false, weight: 0, total: 0 },
};

const mockLocationState = {
  items: mockItems,
  totalWeight: 3.0,
  totalPrice: 70.0,
  userName: 'John Doe',
  userEmail: 'john@example.com',
};

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('userName', 'John Doe');
  localStorage.setItem('userEmail', 'john@example.com');
});

describe('Summary Component', () => {
  const renderSummary = () =>
    render(
      <MemoryRouter initialEntries={[{ pathname: '/summary', state: mockLocationState }]}>
        <Routes>
          <Route path="/summary" element={<Summary />} />
          <Route path="/schedule-collection" element={<ScheduleCollection />} />
        </Routes>
      </MemoryRouter>
    );

  test('renders Summary component with correct data', () => {
    renderSummary();

    // Check if the total weight and total price are displayed correctly
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('3.0 kg')).toBeInTheDocument();
    expect(screen.getByText('Rs. 70.00')).toBeInTheDocument();

    // Check if the service fee and to receive amount are displayed correctly
    expect(screen.getByText('Service Fee')).toBeInTheDocument();
    expect(screen.getByText('- Rs. 20.00')).toBeInTheDocument();
    expect(screen.getByText('To Receive')).toBeInTheDocument();
    expect(screen.getByText('Rs. 50.00')).toBeInTheDocument();

    // Check if the payment methods are displayed
    expect(screen.getByLabelText('Cash')).toBeInTheDocument();
    expect(screen.getByLabelText('PayCheck')).toBeInTheDocument();
  });

  test('updates selected payment method', () => {
    renderSummary();

    // Check the default selected payment method
    expect(screen.getByLabelText('Cash')).toBeChecked();
    expect(screen.getByLabelText('PayCheck')).not.toBeChecked();

    // Simulate changing payment method to PayCheck
    fireEvent.click(screen.getByLabelText('PayCheck'));

    // Verify the change
    expect(screen.getByLabelText('Cash')).not.toBeChecked();
    expect(screen.getByLabelText('PayCheck')).toBeChecked();
  });

  test('navigates to ScheduleCollection on clicking Next', () => {
    const { container } = renderSummary();

    // Click the "Next" button
    fireEvent.click(screen.getByText('Next'));

    // Check if navigation to schedule-collection page occurs
    expect(container.innerHTML).toMatch(/ScheduleCollection/i); // Assuming this text appears in ScheduleCollection component
  });
});
