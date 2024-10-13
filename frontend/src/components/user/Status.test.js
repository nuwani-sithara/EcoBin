import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Status from './Status';

const renderComponent = (state) => {
  return render(
    <BrowserRouter>
      <Status />
    </BrowserRouter>,
    {
      initialEntries: [{ state }],
    }
  );
};

describe('Status Component', () => {
  test('displays payment status details correctly', () => {
    const state = { paymentMethod: 'Online Payment', paymentStatus: 'Completed', amount: 1000 };
    renderComponent(state);

    expect(screen.getByText(/Payment Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Method:/i)).toHaveTextContent('Payment Method: Online Payment');
    expect(screen.getByText(/Payment Status:/i)).toHaveTextContent('Payment Status: Completed');
    expect(screen.getByText(/Total Amount:/i)).toHaveTextContent('Total Amount: Rs. 1000.00');
  });

  test('navigates back to the schedule page on button click', () => {
    const state = { paymentMethod: 'Cash', paymentStatus: 'Pending', amount: 500 };
    const { container } = renderComponent(state);

    const button = screen.getByText(/Ok/i);
    fireEvent.click(button);

    expect(container.location.pathname).toBe('/addschedule'); // Ensure navigation to the schedule page
  });

  test('displays N/A for missing payment details', () => {
    renderComponent({});

    expect(screen.getByText(/Payment Method:/i)).toHaveTextContent('Payment Method: N/A'); // Assume default behavior for missing details
    expect(screen.getByText(/Payment Status:/i)).toHaveTextContent('Payment Status: N/A');
    expect(screen.getByText(/Total Amount:/i)).toHaveTextContent('Total Amount: Rs. 0.00');
  });
});
