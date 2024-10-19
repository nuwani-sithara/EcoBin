import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MyCompostRequests from '../MyCompostRequests'; // Adjust the import path if necessary
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('MyCompostRequests Component', () => {
    const compostRequestsMock = [
        {
            _id: '1',
            potential: 100,
            amount: 50,
            cost: 12500,
            address: '123 Compost St',
            status: 'Pending'
        },
        {
            _id: '2',
            potential: 200,
            amount: 100,
            cost: 25000,
            address: '456 Compost Ave',
            status: 'Completed'
        }
    ];

    beforeEach(() => {
        localStorage.setItem('userEmail', 'test@example.com'); // Mock user email in local storage
        axios.get.mockResolvedValue({ data: compostRequestsMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders My Compost Requests title', () => {
        render(
            <Router>
                <MyCompostRequests />
            </Router>
        );

        const titleElement = screen.getByText(/My Compost Requests/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('fetches and displays compost requests', async () => {
        render(
            <Router>
                <MyCompostRequests />
            </Router>
        );

        const potentialWeightElement = await screen.findByText(/100/i);
        expect(potentialWeightElement).toBeInTheDocument();
        
        const addressElement = await screen.findByText(/123 Compost St/i);
        expect(addressElement).toBeInTheDocument();
    });

    test('deletes a compost request', async () => {
        axios.delete.mockResolvedValue({}); // Mock delete response

        render(
            <Router>
                <MyCompostRequests />
            </Router>
        );

        // Click the delete button for the first request
        const deleteButton = await screen.findByText(/Delete/i);
        fireEvent.click(deleteButton);

        // Ensure the request is removed from the document
        await waitFor(() => {
            expect(screen.queryByText(/123 Compost St/i)).not.toBeInTheDocument();
        });
    });

    test('edits and updates a compost request', async () => {
        render(
            <Router>
                <MyCompostRequests />
            </Router>
        );

        // Click the edit button for the first request
        const editButton = await screen.findByText(/Edit/i);
        fireEvent.click(editButton);

        // Change the amount and address
        const amountInput = screen.getByRole('spinbutton'); // Number input for amount
        fireEvent.change(amountInput, { target: { value: '60' } });

        const addressInput = screen.getByRole('textbox'); // Text input for address
        fireEvent.change(addressInput, { target: { value: '789 Compost Blvd' } });

        // Mock the update request
        axios.put.mockResolvedValue({});

        // Click the save button
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        // Check if the updated values are displayed
        await waitFor(() => {
            expect(screen.getByText(/60/i)).toBeInTheDocument();
            expect(screen.getByText(/789 Compost Blvd/i)).toBeInTheDocument();
        });
    });

    test('displays message when no compost requests are found', async () => {
        axios.get.mockResolvedValue({ data: [] }); // Mock no data response

        render(
            <Router>
                <MyCompostRequests />
            </Router>
        );

        const messageElement = await screen.findByText(/No compost requests found/i);
        expect(messageElement).toBeInTheDocument();
    });
});
