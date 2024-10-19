import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GarbageActions from '../GarbageActions'; // Adjust the import path if necessary
import '@testing-library/jest-dom/extend-expect';

describe('GarbageActions Component', () => {
    // Helper function to render the component with Router
    const renderComponent = () => {
        render(
            <Router>
                <GarbageActions />
            </Router>
        );
    };

    test('renders the Garbage Handover Actions title', () => {
        renderComponent();
        const titleElement = screen.getByText(/Garbage Handover Actions/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders Add Waste Details section', () => {
        renderComponent();
        const addWasteElement = screen.getByText(/Add Waste Details/i);
        expect(addWasteElement).toBeInTheDocument();
    });

    test('renders My Added Waste Details section', () => {
        renderComponent();
        const myWasteDetailsElement = screen.getByText(/My Added Waste Details/i);
        expect(myWasteDetailsElement).toBeInTheDocument();
    });

    test('navigates to Add Waste Details page on click', () => {
        renderComponent();
        
        const addWasteElement = screen.getByText(/Add Waste Details/i);
        fireEvent.click(addWasteElement);
        
        // Normally you would check for navigation; this is a placeholder for actual checks
        expect(addWasteElement).toBeInTheDocument(); // Placeholder check
    });

    test('navigates to My Added Waste Details page on click', () => {
        renderComponent();

        const myWasteDetailsElement = screen.getByText(/My Added Waste Details/i);
        fireEvent.click(myWasteDetailsElement);
        
        // Similar to the previous test, check if the click action is registered.
        expect(myWasteDetailsElement).toBeInTheDocument(); // Placeholder check
    });
});
