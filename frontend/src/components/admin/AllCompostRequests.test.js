import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AllCompostRequests from './AllCompostRequests';

// Mock axios
jest.mock('axios');

describe('AllCompostRequests Component', () => {
    const mockRequests = [
        {
            _id: '1',
            email: 'test1@example.com',
            potential: '20 kg',
            amount: '10',
            cost: '1000',
            status: 'Pending',
        },
        {
            _id: '2',
            email: 'test2@example.com',
            potential: '30 kg',
            amount: '15',
            cost: '1500',
            status: 'Approved',
        },
    ];

    beforeEach(() => {
        // Mock the get request to return sample compost requests
        axios.get.mockResolvedValueOnce({ data: mockRequests });
    });

    test('renders the component and fetches compost requests', async () => {
        render(<AllCompostRequests />);

        // Check if the heading is rendered
        expect(screen.getByText('All Compost Requests')).toBeInTheDocument();

        // Wait for the requests to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Email: test1@example.com')).toBeInTheDocument();
            expect(screen.getByText('Email: test2@example.com')).toBeInTheDocument();
        });
    });

    test('allows updating the status of a compost request', async () => {
        render(<AllCompostRequests />);

        // Wait for the requests to be fetched
        await waitFor(() => {
            expect(screen.getByText('Email: test1@example.com')).toBeInTheDocument();
        });

        // Click the 'Edit Status' button for the first request
        fireEvent.click(screen.getAllByText('Edit Status')[0]);

        // Change the status in the select dropdown
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Approved' } });

        // Click the 'Save' button
        fireEvent.click(screen.getByText('Save'));

        // Mock the PUT request to resolve
        axios.put.mockResolvedValueOnce({});

        // Check if the new status is updated
        await waitFor(() => {
            expect(screen.getByText('Status: Approved')).toBeInTheDocument();
        });
    });

    test('allows deleting a compost request', async () => {
        render(<AllCompostRequests />);

        // Wait for the requests to be fetched
        await waitFor(() => {
            expect(screen.getByText('Email: test1@example.com')).toBeInTheDocument();
        });

        // Click the 'Delete' button for the first request
        fireEvent.click(screen.getAllByText('Delete')[0]);

        // Mock the DELETE request to resolve
        axios.delete.mockResolvedValueOnce({});

        // Wait for the deleted request to disappear
        await waitFor(() => {
            expect(screen.queryByText('Email: test1@example.com')).not.toBeInTheDocument();
        });
    });
});
