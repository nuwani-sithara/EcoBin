import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SeeSchedule from './SeeSchedule';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

// Helper function to render the component within Router
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <SeeSchedule />
    </BrowserRouter>
  );
};

describe('SeeSchedule Component', () => {
  const mockSchedules = [
    { _id: '1', address: '123 Street', district: 'Colombo', dateTime: '2024-10-07T10:00:00Z' },
    { _id: '2', address: '456 Avenue', district: 'Galle', dateTime: '2024-10-08T12:00:00Z' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders schedule details successfully when data is fetched', async () => {
    // Mock API response for fetching schedules
    axios.get.mockResolvedValueOnce({ data: mockSchedules });

    renderComponent();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument(); // Initially loading

    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()); // Wait for loading to disappear

    // Check if schedule details are rendered
    expect(screen.getByText('123 Street')).toBeInTheDocument();
    expect(screen.getByText('Colombo')).toBeInTheDocument();
    expect(screen.getByText('456 Avenue')).toBeInTheDocument();
    expect(screen.getByText('Galle')).toBeInTheDocument();
  });

  test('displays an error message when fetching schedules fails', async () => {
    // Mock API error response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch schedules. Please try again later./i)).toBeInTheDocument();
    });
  });

  test('successfully deletes a schedule when delete button is clicked', async () => {
    // Mock API response for fetching schedules
    axios.get.mockResolvedValueOnce({ data: mockSchedules });
    // Mock successful API response for deleting a schedule
    axios.delete.mockResolvedValueOnce({ data: { message: 'Deleted successfully' } });

    renderComponent();

    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()); // Wait for loading to disappear

    expect(screen.getByText('123 Street')).toBeInTheDocument(); // Ensure schedule is present

    // Simulate clicking the delete button for the first schedule
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Wait for the schedule to be deleted from the UI
    await waitFor(() => {
      expect(screen.queryByText('123 Street')).not.toBeInTheDocument();
    });
  });

  test('displays an error message when deleting a schedule fails', async () => {
    // Mock API response for fetching schedules
    axios.get.mockResolvedValueOnce({ data: mockSchedules });
    // Mock API error response for deleting a schedule
    axios.delete.mockRejectedValueOnce(new Error('Failed to delete'));

    renderComponent();

    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()); // Wait for loading to disappear

    // Simulate clicking the delete button for the first schedule
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to delete schedule. Please try again later./i)).toBeInTheDocument();
    });
  });

  test('displays "No schedules found" when there are no schedules', async () => {
    // Mock API response with no schedules
    axios.get.mockResolvedValueOnce({ data: [] });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/No schedules found/i)).toBeInTheDocument();
    });
  });
});
