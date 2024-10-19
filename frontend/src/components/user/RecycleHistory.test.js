import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import RecycleHistory from '../components/RecycleHistory'; // Adjust the path based on your project structure
import { MemoryRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

describe('RecycleHistory Component', () => {
  const mockHistoryData = [
    {
      _id: '1',
      items: [
        { itemName: 'Plastic Bottles', weight: 1.2, total: 24.0 },
        { itemName: 'Metal Cans', weight: 2.5, total: 50.0 },
      ],
      totalWeight: 3.7,
      totalPrice: 74.0,
      paymentType: 'Cash',
      dateTime: '2024-10-19T10:00:00Z',
      toReceive: 54.0,
      status: 'Finished',
    },
    {
      _id: '2',
      items: [
        { itemName: 'Glass', weight: 1.0, total: 15.0 },
      ],
      totalWeight: 1.0,
      totalPrice: 15.0,
      paymentType: 'PayCheck',
      dateTime: '2024-09-10T08:30:00Z',
      toReceive: -5.0,
      status: 'Cancelled',
    },
  ];

  beforeEach(() => {
    // Mock the axios.get method to return the history data
    axios.get.mockResolvedValue({
      data: mockHistoryData,
    });

    // Mock localStorage values
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') return 'mockedToken';
      if (key === 'userEmail') return 'test@example.com';
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  test('renders the Recycle History with data', async () => {
    render(
      <MemoryRouter>
        <RecycleHistory />
      </MemoryRouter>
    );

    // Wait for the data to be displayed on the page
    await waitFor(() => {
      // Check if the item names are displayed
      expect(screen.getByText('Plastic Bottles')).toBeInTheDocument();
      expect(screen.getByText('Metal Cans')).toBeInTheDocument();
      expect(screen.getByText('Glass')).toBeInTheDocument();

      // Check if the totals are displayed
      expect(screen.getByText('Rs 24.00')).toBeInTheDocument();
      expect(screen.getByText('Rs 50.00')).toBeInTheDocument();
      expect(screen.getByText('Rs 15.00')).toBeInTheDocument();

      // Check if payment methods are displayed
      expect(screen.getByText('Payment Method: Cash')).toBeInTheDocument();
      expect(screen.getByText('Payment Method: PayCheck')).toBeInTheDocument();

      // Check if the status is displayed
      expect(screen.getByText('Status: Finished')).toBeInTheDocument();
      expect(screen.getByText('Status: Cancelled')).toBeInTheDocument();
    });
  });

  test('shows the correct payment method and status', async () => {
    render(
      <MemoryRouter>
        <RecycleHistory />
      </MemoryRouter>
    );

    // Wait for the data to load and check specific payment methods and statuses
    await waitFor(() => {
      expect(screen.getByText('Payment Method: Cash')).toBeInTheDocument();
      expect(screen.getByText('Payment Method: PayCheck')).toBeInTheDocument();
      expect(screen.getByText('Status: Finished')).toBeInTheDocument();
      expect(screen.getByText('Status: Cancelled')).toBeInTheDocument();
    });
  });
});
