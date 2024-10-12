import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Import jest-dom matchers
import Schedule from './Schedule';


test('submits the form with valid data', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() + 3600000).toISOString().slice(0, 16) } }); // Set future date

    fireEvent.click(screen.getByText(/continue/i));

    // Use a flexible matcher for success message
    expect(await screen.findByText((content, element) =>
        content.includes("schedule successfully added")
    )).toBeInTheDocument();
});

test('shows error when address is empty', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() + 3600000).toISOString().slice(0, 16) } });

    fireEvent.click(screen.getByText(/continue/i));

    // Use a flexible matcher for error message
    expect(await screen.findByText((content, element) =>
        content.includes("address is required")
    )).toBeInTheDocument();
});

test('shows error when date is in the past', async () => {
    render(<Schedule />);
    
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/district/i), { target: { value: 'Gampaha' } });
    fireEvent.change(screen.getByLabelText(/date and time/i), { target: { value: new Date(Date.now() - 3600000).toISOString().slice(0, 16) } }); // Set past date

    fireEvent.click(screen.getByText(/continue/i));

    // Use a flexible matcher for past date error message
    expect(await screen.findByText((content, element) =>
        content.includes("you can only select today or future dates")
    )).toBeInTheDocument();
});
