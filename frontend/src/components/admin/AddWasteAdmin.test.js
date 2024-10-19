import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddWasteAdmin from "./AddWasteAdmin";
import { BrowserRouter } from "react-router-dom";

// Mock axios for both GET and POST requests
jest.mock("axios");

describe("AddWasteAdmin Component", () => {
    beforeEach(() => {
        // Clear any previous mocks
        jest.clearAllMocks();
    });

    it("renders the form and category dropdown correctly", async () => {
        // Mock GET request for categories
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: "cat1", name: "Plastic" },
                { _id: "cat2", name: "Glass" },
            ],
        });

        render(
            <BrowserRouter>
                <AddWasteAdmin />
            </BrowserRouter>
        );

        // Check if form elements are rendered
        expect(screen.getByLabelText(/Select Waste Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Waste/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter Weight/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter Quantity/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Add Waste/i })).toBeInTheDocument();

        // Wait for categories to be loaded
        await waitFor(() => {
            const categoryDropdown = screen.getByLabelText(/Select Waste Category/i);
            expect(categoryDropdown).toHaveLength(3); // default + 2 categories
            expect(screen.getByText(/Plastic/i)).toBeInTheDocument();
            expect(screen.getByText(/Glass/i)).toBeInTheDocument();
        });
    });

    it("allows input changes", async () => {
        // Mock GET request for categories
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: "cat1", name: "Plastic" },
                { _id: "cat2", name: "Glass" },
            ],
        });

        render(
            <BrowserRouter>
                <AddWasteAdmin />
            </BrowserRouter>
        );

        // Wait for categories to be loaded
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/Select Waste Category/i), {
                target: { value: "cat1" },
            });
        });

        // Simulate input changes
        fireEvent.change(screen.getByLabelText(/Waste/i), { target: { value: "Plastic Bottles" } });
        fireEvent.change(screen.getByLabelText(/Enter Weight/i), { target: { value: "20" } });
        fireEvent.change(screen.getByLabelText(/Enter Quantity/i), { target: { value: "5" } });
        fireEvent.change(screen.getByLabelText(/-- Select Weight Type --/i), { target: { value: "kg" } });

        // Verify input values
        expect(screen.getByLabelText(/Select Waste Category/i).value).toBe("cat1");
        expect(screen.getByLabelText(/Waste/i).value).toBe("Plastic Bottles");
        expect(screen.getByLabelText(/Enter Weight/i).value).toBe("20");
        expect(screen.getByLabelText(/Enter Quantity/i).value).toBe("5");
        expect(screen.getByLabelText(/-- Select Weight Type --/i).value).toBe("kg");
    });

    it("submits the form successfully", async () => {
        // Mock GET request for categories and POST request for submission
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: "cat1", name: "Plastic" },
                { _id: "cat2", name: "Glass" },
            ],
        });

        axios.post.mockResolvedValueOnce({ data: { message: "Waste added successfully!" } });

        render(
            <BrowserRouter>
                <AddWasteAdmin />
            </BrowserRouter>
        );

        // Fill the form
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/Select Waste Category/i), {
                target: { value: "cat1" },
            });
        });

        fireEvent.change(screen.getByLabelText(/Waste/i), { target: { value: "Plastic Bottles" } });
        fireEvent.change(screen.getByLabelText(/Enter Weight/i), { target: { value: "20" } });
        fireEvent.change(screen.getByLabelText(/Enter Quantity/i), { target: { value: "5" } });
        fireEvent.change(screen.getByLabelText(/-- Select Weight Type --/i), { target: { value: "kg" } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Add Waste/i }));

        // Verify axios post request is made with correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("http://localhost:8070/wastedetail/add-waste", {
                category: "cat1",
                waste: "Plastic Bottles",
                weight: "20",
                weightType: "kg",
                quantity: "5",
            });
        });

        // Optionally check if the alert for success is triggered (if using Jest alert mock)
        await waitFor(() => {
            expect(screen.queryByText(/Successfully added waste!/i)).toBeInTheDocument();
        });
    });

    it("handles submission error", async () => {
        // Mock GET request for categories and error response for POST request
        axios.get.mockResolvedValueOnce({
            data: [
                { _id: "cat1", name: "Plastic" },
                { _id: "cat2", name: "Glass" },
            ],
        });

        axios.post.mockRejectedValueOnce(new Error("Failed to add waste"));

        render(
            <BrowserRouter>
                <AddWasteAdmin />
            </BrowserRouter>
        );

        // Fill the form
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/Select Waste Category/i), {
                target: { value: "cat1" },
            });
        });

        fireEvent.change(screen.getByLabelText(/Waste/i), { target: { value: "Plastic Bottles" } });
        fireEvent.change(screen.getByLabelText(/Enter Weight/i), { target: { value: "20" } });
        fireEvent.change(screen.getByLabelText(/Enter Quantity/i), { target: { value: "5" } });
        fireEvent.change(screen.getByLabelText(/-- Select Weight Type --/i), { target: { value: "kg" } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Add Waste/i }));

        // Verify axios post request is made and then failed
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });

        // Check error handling (if using alert mock)
        await waitFor(() => {
            expect(screen.queryByText(/Failed to add waste. Please try again./i)).toBeInTheDocument();
        });
    });
});
