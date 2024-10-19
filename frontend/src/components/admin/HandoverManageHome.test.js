import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // To enable routing
import HandoverManageHome from './HandoverManageHome' // Adjust path as needed

describe('HandoverManageHome Component', () => {

  test('renders the header correctly', () => {
    render(
      <Router>
        <HandoverManageHome />
      </Router>
    );
    
    // Check if header content renders
    expect(screen.getByText(/Garbage-handover-manage/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage operations efficiently with our tools./i)).toBeInTheDocument();
  });

  test('renders the correct number of dashboard cards', () => {
    render(
      <Router>
        <HandoverManageHome />
      </Router>
    );

    // Check if all cards are rendered
    expect(screen.getByText(/Add Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Waste Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Routes/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Routes/i)).toBeInTheDocument();
  });

  test('check if the correct links exist for each card', () => {
    render(
      <Router>
        <HandoverManageHome />
      </Router>
    );

    // Check if the "Manage" buttons link to the right routes
    expect(screen.getByText('Manage').closest('a')).toHaveAttribute('href', '/add-category');
    expect(screen.getAllByText('Manage')[1].closest('a')).toHaveAttribute('href', '/manage-category');
    expect(screen.getAllByText('Manage')[2].closest('a')).toHaveAttribute('href', '/manage-waste');
    expect(screen.getAllByText('Manage')[3].closest('a')).toHaveAttribute('href', '/add-routes-admin');
    expect(screen.getAllByText('Manage')[4].closest('a')).toHaveAttribute('href', '/manage-route-admin');
  });
});
