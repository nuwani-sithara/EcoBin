import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddCompostRequest from './AddCompostRequest';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const mockCategories = [
  { _id: '1', name: 'organic' },
  { _id: '2', name: 'plastic' }
];

const mockWasteDetails = [
  { category: '1', weight: 100 },
  { category: '1', weight: 50 },
  { category: '2', weight: 20 }
];

const mockCompostRequest = {
  email: 'test@test.com',
  potential: 52.5,
  amount: 30,
  cost: 7500,
  address: 'Test Address'
};

describe('AddCompostRequest Component', () => {
  beforeEach(() => {
    localStorage.setItem('userEmail', 'test@test.com');

    axios.get.mockImplementation((url) => {
      if (url.includes('category/view-categories')) {
        return Promise.resolve({ data: mockCategories });
      }
      if (url.includes('wastedetail/user-waste')) {
        return Promise.resolve({ data: mockWasteDetails });
      }
    });

    axios.post.mockResolvedValue({ data: mockCompostRequest });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the compost request form correctly', async () => {
    render(
      <Router>
        <AddCompostRequest />
      </Router>
    );

    // Check if the form elements are rendered correctly
    expect(screen.getByLabelText(/Organic Waste Weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Potential Compost Output/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Desired compost Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('150')).toBeInTheDocument(); // Organic waste total
      expect(screen.getByDisplayValue('52.50')).toBeInTheDocument(); // Potential compost output
    });
  });

  it('should update the form values when user inputs data', async () => {
    render(
      <Router>
        <AddCompostRequest />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('150')).toBeInTheDocument(); // Organic waste total
      expect(screen.getByDisplayValue('52.50')).toBeInTheDocument(); // Potential compost output
    });

    const amountInput = screen.getByLabelText(/Desired compost Amount/i);
    const addressInput = screen.getByLabelText(/Delivery Address/i);

    fireEvent.change(amountInput, { target: { value: '30' } });
    fireEvent.change(addressInput, { target: { value: '123 Test Street' } });

    expect(amountInput.value).toBe('30');
    expect(addressInput.value).toBe('123 Test Street');
  });

  it('should calculate the cost based on the compost amount', async () => {
    render(
      <Router>
        <AddCompostRequest />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('150')).toBeInTheDocument();
      expect(screen.getByDisplayValue('52.50')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText(/Desired compost Amount/i);
    fireEvent.change(amountInput, { target: { value: '30' } });

    const calculateCostButton = screen.getByText(/Calculate Cost/i);
    fireEvent.click(calculateCostButton);

    const costInput = screen.getByLabelText(/Cost \(Rs\)/i);
    await waitFor(() => {
      expect(costInput.value).toBe('7500'); // 30 * 250 = 7500
    });
  });

  it('should not submit the form if desired amount exceeds potential output', async () => {
    render(
      <Router>
        <AddCompostRequest />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('52.50')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText(/Desired compost Amount/i);
    fireEvent.change(amountInput, { target: { value: '60' } });

    const submitButton = screen.getByText(/Order/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/cannot exceed potential compost output/i)).toBeInTheDocument();
    });
  });

  it('should submit the form with valid inputs', async () => {
    render(
      <Router>
        <AddCompostRequest />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('52.50')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText(/Desired compost Amount/i);
    const addressInput = screen.getByLabelText(/Delivery Address/i);

    fireEvent.change(amountInput, { target: { value: '30' } });
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });

    const calculateCostButton = screen.getByText(/Calculate Cost/i);
    fireEvent.click(calculateCostButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue('7500')).toBeInTheDocument(); // 30 * 250 = 7500
    });

    const submitButton = screen.getByText(/Order/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Compost Request Added/i)).toBeInTheDocument();
    });
  });
});
