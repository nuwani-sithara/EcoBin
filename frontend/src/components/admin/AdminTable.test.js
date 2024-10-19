import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AdminTable from '../components/AdminTable';

// Mock axios
jest.mock('axios');

describe('AdminTable Component', () => {
  // Test setup
  const mockData = [
    {
      _id: '1',
      address: '123 Main St',
      district: 'Colombo',
      dateTime: new Date().toISOString(),
      items: [
        { itemName: 'Plastic', weight: 1.2 },
        { itemName: 'Metal', weight: 2.5 }
      ],
      paymentType: 'Cash',
      toReceive: 500,
      status: 'Finished',
    },
    {
      _id: '2',
      address: '456 Second St',
      district: 'Gampaha',
      dateTime: new Date().toISOString(),
      items: [
        { itemName: 'Glass', weight: 0.5 },
        { itemName: 'Paper', weight: 1.8 }
      ],
      paymentType: 'Card',
      toReceive: 300,
      status: 'Cancelled',
    },
  ];

  beforeEach(() => {
    // Mock axios get response
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('renders AdminTable and displays fetched data', async () => {
    render(<AdminTable />);

    // Check if the table is rendered with correct headers
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/District/i)).toBeInTheDocument();
    expect(screen.getByText(/Recycle Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Type/i)).toBeInTheDocument();

    // Check if mock data is displayed in the table
    expect(await screen.findByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Colombo')).toBeInTheDocument();
    expect(screen.getByText('Plastic - 1.2kg')).toBeInTheDocument();
    expect(screen.getByText('Cash')).toBeInTheDocument();
    expect(screen.getByText('Finished')).toBeInTheDocument();
  });

  test('filters table rows based on search term', async () => {
    render(<AdminTable />);

    // Wait for data to be fetched and rendered
    await screen.findByText('123 Main St');

    // Check if both rows are initially displayed
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('456 Second St')).toBeInTheDocument();

    // Simulate entering search term
    fireEvent.change(screen.getByPlaceholderText(/Search by Address/i), {
      target: { value: 'Colombo' },
    });

    // Only the row with "Colombo" in the district should be visible
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.queryByText('456 Second St')).not.toBeInTheDocument();
  });

  test('updates status when buttons are clicked', async () => {
    axios.put.mockResolvedValue({ data: { msg: 'Status updated successfully' } });

    render(<AdminTable />);

    // Wait for data to be rendered
    const finishButton = await screen.findByText(/Finish/i);
    
    // Simulate clicking "Finish"
    fireEvent.click(finishButton);

    // Check if axios.put was called with the correct arguments
    expect(axios.put).toHaveBeenCalledWith('http://localhost:8070/api/recycle/update-status', {
      id: '1',
      status: 'Finished',
    });

    // Optionally: Check if alert was triggered (you may need to mock window.alert)
  });
});
