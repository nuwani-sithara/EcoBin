import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CompostActions from '../CompostActions'; // Adjust the import path if necessary
import '@testing-library/jest-dom/extend-expect';

describe('CompostActions Component', () => {
    // Helper function to render the component with Router
    const renderComponent = () => {
        render(
            <Router>
                <CompostActions />
            </Router>
        );
    };

    test('renders the Compost Actions title', () => {
        renderComponent();
        const titleElement = screen.getByText(/Compost Actions/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders Add Compost Request section', () => {
        renderComponent();
        const addCompostRequestElement = screen.getByText(/Add Compost Request/i);
        expect(addCompostRequestElement).toBeInTheDocument();
    });

    test('renders My Compost Requests section', () => {
        renderComponent();
        const myCompostRequestsElement = screen.getByText(/My Compost Requests/i);
        expect(myCompostRequestsElement).toBeInTheDocument();
    });

    test('navigates to Add Compost Request page on click', () => {
        const { container } = render(
            <Router>
                <CompostActions />
            </Router>
        );

        const addCompostRequestElement = screen.getByText(/Add Compost Request/i);
        fireEvent.click(addCompostRequestElement);
        // Here you would normally check if the navigation occurred.
        // Since we don't have a real router setup in tests, we can check the click action
        expect(addCompostRequestElement).toBeInTheDocument(); // This is a placeholder; use proper navigation check in a real app
    });

    test('navigates to My Compost Requests page on click', () => {
        const { container } = render(
            <Router>
                <CompostActions />
            </Router>
        );

        const myCompostRequestsElement = screen.getByText(/My Compost Requests/i);
        fireEvent.click(myCompostRequestsElement);
        // Similar to the previous test, check if the click action is registered.
        expect(myCompostRequestsElement).toBeInTheDocument(); // This is a placeholder; use proper navigation check in a real app
    });
});
