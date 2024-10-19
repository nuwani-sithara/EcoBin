import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageWaste from './ManageWaste';

// Mock axios to prevent real API calls
jest.mock('axios');

describe('ManageWaste Component', () => {
    const mockWastesDetails = [
        {
            _id: '1',
            email: 'test1@example.com',
            category: { _id: 'cat1', name: 'Category 1' },
            waste: 'Plastic',
            weight: 10,
            route: 'Route 1',
            status: 'Pending'
        },
        {
            _id: '2',
            email: 'test2@example.com',
            category: { _id: 'cat2', name: 'Category 2' },
            waste: 'Glass',
            weight: 20,
            route: 'Route 2',
            status: 'Completed'
        }
    ];

    const mockCategories = [
        { _id: 'cat1', name: 'Category 1' },
        { _id: 'cat2', name: 'Category 2' }
    ];

    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            if (url === 'http://localhost:8070/wastedetail/view-waste') {
                return Promise.resolve({ data: mockWastesDetails });
            } else if (url === 'http://localhost:8070/category/view-categories') {
                return Promise.resolve({ data: mockCategories });
            }
        });

        axios.put.mockResolvedValue({});
        axios.delete.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders waste details table with data', async () => {
        render(<ManageWaste />);

        // Wait for data to load
        await waitFor(() => screen.getByText('test1@example.com'));

        // Check if waste details are displayed
        expect(screen.getByText('test1@example.com')).toBeInTheDocument();
        expect(screen.getByText('Plastic')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    test('opens edit mode when Edit button is clicked', async () => {
        render(<ManageWaste />);

        await waitFor(() => screen.getByText('test1@example.com'));

        // Click on the Edit button
        const editButton = screen.getAllByText('Edit')[0];
        fireEvent.click(editButton);

        // Ensure input fields are rendered in edit mode
        expect(screen.getByDisplayValue('test1@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Plastic')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Pending')).toBeInTheDocument();
    });

    test('updates waste detail on Save', async () => {
        render(<ManageWaste />);

        await waitFor(() => screen.getByText('test1@example.com'));

        // Click on the Edit button
        fireEvent.click(screen.getAllByText('Edit')[0]);

        // Modify the waste field
        const wasteInput = screen.getByDisplayValue('Plastic');
        fireEvent.change(wasteInput, { target: { value: 'Metal' } });

        // Click on the Save button
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Ensure axios.put was called with updated data
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:8070/wastedetail/update-waste/1',
                expect.objectContaining({
                    email: 'test1@example.com',
                    waste: 'Metal',
                })
            );
        });
    });

    test('deletes waste detail on Delete', async () => {
        render(<ManageWaste />);

        await waitFor(() => screen.getByText('test1@example.com'));

        // Click on the Delete button
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        // Ensure axios.delete was called with correct id
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8070/wastedetail/delete-waste/1');
        });
    });
});
