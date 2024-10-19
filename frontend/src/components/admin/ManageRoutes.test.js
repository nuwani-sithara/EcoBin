import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageRoutes from './ManageRoutes'; // Adjust the path as necessary
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock axios for API calls

describe('ManageRoutes Component', () => {

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', date: '2023-10-10', route: 'Route A', time: '10:00' },
        { _id: '2', date: '2023-10-11', route: 'Route B', time: '11:00' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders route table with data', async () => {
    render(
      <Router>
        <ManageRoutes />
      </Router>
    );

    // Verify that routes are displayed after the axios request
    expect(await screen.findByText('Route A')).toBeInTheDocument();
    expect(screen.getByText('Route B')).toBeInTheDocument();
    expect(screen.getByText('2023-10-10')).toBeInTheDocument();
  });

  test('handles edit mode for routes', async () => {
    render(
      <Router>
        <ManageRoutes />
      </Router>
    );

    // Wait for routes to be displayed
    await waitFor(() => screen.getByText('Route A'));

    const editButton = screen.getAllByText('Edit')[0]; // First edit button
    fireEvent.click(editButton);

    // Check that the input fields for editing are shown
    expect(screen.getByDisplayValue('2023-10-10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Route A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();

    // Simulate the Save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:8070/routedetail/update-route/1',
      {
        date: '2023-10-10',
        route: 'Route A',
        time: '10:00',
      }
    );
  });

  test('handles route deletion', async () => {
    render(
      <Router>
        <ManageRoutes />
      </Router>
    );

    // Wait for routes to be displayed
    await waitFor(() => screen.getByText('Route A'));

    // Simulate clicking the delete button
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // Confirm axios delete call
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8070/category/delete-category/1');
    });
  });

  test('handles API fetch error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <Router>
        <ManageRoutes />
      </Router>
    );

    // Expect error to be logged or handled
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Optionally check if the UI responds to error (e.g., error message, alert, etc.)
  });
});
