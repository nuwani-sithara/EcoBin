// ViewUserWastes.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewUserWastes from './ViewUserWastes'; 

jest.mock('axios');

describe('ViewUserWastes Component', () => {
    const mockWastes = [
        {
            _id: '1',
            category: { name: 'Plastic' },
            waste: 'Plastic bottle',
            weight: 1.2,
            weightType: 'kg',
            quantity: 5,
            createdAt: new Date().toISOString(),
        },
        {
            _id: '2',
            category: { name: 'Glass' },
            waste: 'Glass jar',
            weight: 0.5,
            weightType: 'kg',
            quantity: 3,
            createdAt: new Date().toISOString(),
        },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockWastes });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders waste entries correctly', async () => {
        render(<ViewUserWastes />);
        
        // Check if the loading message or empty state is not displayed
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        
        // Wait for the data to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Your Waste Entries')).toBeInTheDocument();
        });

        // Verify the waste entries are displayed
        expect(screen.getByText('Plastic')).toBeInTheDocument();
        expect(screen.getByText('Plastic bottle')).toBeInTheDocument();
        expect(screen.getByText('1.2')).toBeInTheDocument();
        expect(screen.getByText('kg')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText(new Date().toLocaleDateString())).toBeInTheDocument();

        expect(screen.getByText('Glass')).toBeInTheDocument();
        expect(screen.getByText('Glass jar')).toBeInTheDocument();
        expect(screen.getByText('0.5')).toBeInTheDocument();
        expect(screen.getByText('kg')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('handles fetch error', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        render(<ViewUserWastes />);

        // Wait for any loading states or errors to show
        await waitFor(() => {
            expect(screen.getByText('There was an error fetching the waste details!')).toBeInTheDocument();
        });
    });
});
