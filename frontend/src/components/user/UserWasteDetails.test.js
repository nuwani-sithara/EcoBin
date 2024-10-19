// UserWasteDetails.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserWasteDetails from './UserWasteDetails';

// Mock the axios module
jest.mock('axios');

describe('UserWasteDetails Component', () => {
    const userEmail = 'test@example.com';

    beforeEach(() => {
        // Set up local storage
        localStorage.setItem('userEmail', userEmail);

        // Mock axios responses
        axios.get.mockImplementation((url) => {
            if (url.includes('/wastedetail/user-waste/')) {
                return Promise.resolve({ data: [{ _id: '1', email: userEmail, category: {}, waste: 'Plastic', weight: '1kg', route: 'Route A', status: 'Pending' }] });
            }
            if (url === 'http://localhost:8070/category/view-categories') {
                return Promise.resolve({ data: [{ _id: 'cat1', name: 'Plastic' }, { _id: 'cat2', name: 'Paper' }] });
            }
            if (url === 'http://localhost:8070/routedetail/view-route') {
                return Promise.resolve({ data: [{ _id: 'route1', route: 'Route A', date: new Date(), time: '10:00 AM' }] });
            }
            return Promise.reject(new Error('Not Found'));
        });

        render(<UserWasteDetails />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders waste details table', async () => {
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3)); // Check if all 3 axios calls were made

        expect(screen.getByText(/Waste/)).toBeInTheDocument(); // Check if "Waste" header is present
        expect(screen.getByText(/Plastic/)).toBeInTheDocument(); // Check if waste detail is displayed
    });

    it('handles edit action', async () => {
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));

        const editButton = screen.getByRole('button', { name: /Edit/i });
        fireEvent.click(editButton);

        const wasteInput = screen.getByRole('textbox', { name: /waste/i });
        fireEvent.change(wasteInput, { target: { value: 'Glass' } });

        const saveButton = screen.getByRole('button', { name: /Save/i });
        axios.put.mockResolvedValueOnce({});
        fireEvent.click(saveButton);

        await waitFor(() => expect(axios.put).toHaveBeenCalledWith('http://localhost:8070/wastedetail/update-waste/1', expect.objectContaining({ waste: 'Glass' })));
        expect(await screen.findByText(/Waste detail updated/i)).toBeInTheDocument(); // Check for success message
    });

    it('handles delete action', async () => {
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        axios.delete.mockResolvedValueOnce({});
        fireEvent.click(deleteButton);

        await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('http://localhost:8070/wastedetail/delete-waste/1'));
        expect(await screen.findByText(/Waste detail deleted!/i)).toBeInTheDocument(); // Check for success message
    });

    it('shows alert when category is not selected', async () => {
        const editButton = screen.getByRole('button', { name: /Edit/i });
        fireEvent.click(editButton);

        const saveButton = screen.getByRole('button', { name: /Save/i });
        global.alert = jest.fn(); // Mock alert

        fireEvent.click(saveButton);

        expect(global.alert).toHaveBeenCalledWith('Please select a valid category.'); // Check if alert was called
    });
});
