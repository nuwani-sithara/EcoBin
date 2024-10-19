import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageCategories from '../components/ManageCategories'; // Adjust the path as necessary
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock axios for API calls

describe('ManageCategories Component', () => {

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', name: 'Plastic', description: 'Recyclable plastic' },
        { _id: '2', name: 'Paper', description: 'Recyclable paper' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders category table with data', async () => {
    render(
      <Router>
        <ManageCategories />
      </Router>
    );

    // Verify that categories are displayed after the axios request
    expect(await screen.findByText('Plastic')).toBeInTheDocument();
    expect(screen.getByText('Paper')).toBeInTheDocument();
    expect(screen.getByText('Recyclable plastic')).toBeInTheDocument();
  });

  test('handles edit mode for categories', async () => {
    render(
      <Router>
        <ManageCategories />
      </Router>
    );

    // Wait for categories to be displayed
    await waitFor(() => screen.getByText('Plastic'));

    const editButton = screen.getAllByText('Edit')[0]; // First edit button
    fireEvent.click(editButton);

    // Check that the input fields for editing are shown
    expect(screen.getByDisplayValue('Plastic')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Recyclable plastic')).toBeInTheDocument();

    // Simulate the Save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:8070/category/update-category/1',
      {
        name: 'Plastic',
        description: 'Recyclable plastic',
      }
    );
  });

  test('handles category deletion', async () => {
    render(
      <Router>
        <ManageCategories />
      </Router>
    );

    // Wait for categories to be displayed
    await waitFor(() => screen.getByText('Plastic'));

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
        <ManageCategories />
      </Router>
    );

    // Expect error to be logged or handled
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Optionally check if the UI responds to error (e.g., error message, alert, etc.)
  });
});
