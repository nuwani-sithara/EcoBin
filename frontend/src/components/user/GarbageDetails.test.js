import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Schedule from './Schedule';

beforeAll(() => {
  window.alert = jest.fn(); // Mock window alert
});

describe('Schedule Component', () => {
  test('submits the form with valid data', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() + 3600000).toISOString().slice(0, 16) } }); // Set future date

    fireEvent.click(screen.getByText(/continue/i));

    expect(await screen.findByText(/schedule successfully added/i)).toBeInTheDocument();
  });

  test('shows error when address is empty', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() + 3600000).toISOString().slice(0, 16) } });

    fireEvent.click(screen.getByText(/continue/i));

    expect(await screen.findByText(/address is required/i)).toBeInTheDocument();
  });

  test('shows error when date is in the past', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() - 3600000).toISOString().slice(0, 16) } }); // Set past date

    fireEvent.click(screen.getByText(/continue/i));

    expect(await screen.findByText(/you can only select today or future dates/i)).toBeInTheDocument();
  });
});
