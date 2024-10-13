import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SeeGarbageDetails from './SeeGarbageDetails';
import axios from 'axios';

// Mocking the axios module
jest.mock('axios');

// Create a function to render the component
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <SeeGarbageDetails />
    </BrowserRouter>
  );
};

describe('SeeGarbageDetails Component', () => {
  const mockGarbageDetails = [
    { _id: '1', name: 'Garbage 1', contactNumber: '1234567890', type: 'Plastic', weight: 10, additionalNotes: 'Some notes' },
    { _id: '2', name: 'Garbage 2', contactNumber: '0987654321', type: 'Organic', weight: 20, additionalNotes: 'Some other notes' },
  ];

  test('renders garbage details when data is fetched successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGarbageDetails });
    
    renderComponent();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument(); // Initially loading
    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()); // Wait for loading to disappear

    // Check if garbage details are rendered
    expect(screen.getByText('Garbage 1')).toBeInTheDocument();
    expect(screen.getByText('Garbage 2')).toBeInTheDocument();
  });

  test('shows error message when fetching garbage details fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch garbage details./i)).toBeInTheDocument();
    });
  });

  test('successfully deletes garbage detail', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGarbageDetails });
    axios.delete.mockResolvedValueOnce({ data: { message: 'Deleted successfully' } });
    
    renderComponent();
    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument());

    expect(screen.getByText('Garbage 1')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[0]); // Click delete for the first garbage

    await waitFor(() => {
      expect(screen.queryByText('Garbage 1')).not.toBeInTheDocument(); // Ensure it is deleted
    });
  });

  test('shows error message when delete fails', async () => {
    axios.get.mockResolvedValueOnce({ data: mockGarbageDetails });
    axios.delete.mockRejectedValueOnce(new Error('Failed to delete'));

    renderComponent();
    await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument());

    fireEvent.click(screen.getAllByText('Delete')[0]); // Click delete for the first garbage

    await waitFor(() => {
      expect(screen.getByText(/Failed to delete garbage detail./i)).toBeInTheDocument(); // Check error message
    });
  });
});
