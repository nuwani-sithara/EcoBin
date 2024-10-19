import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddRoutes from "./AddRoutes";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

describe("AddRoutes Component", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it("renders the AddRoutes form", () => {
        render(
            <BrowserRouter>
                <AddRoutes />
            </BrowserRouter>
        );

        // Check if form elements are rendered
        expect(screen.getByText("Add Route")).toBeInTheDocument();
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
        expect(screen.getByLabelText("Route")).toBeInTheDocument();
        expect(screen.getByLabelText("Time")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Add Route/i })).toBeInTheDocument();
    });

    it("allows input changes", () => {
        render(
            <BrowserRouter>
                <AddRoutes />
            </BrowserRouter>
        );

        // Get input fields
        const dateInput = screen.getByLabelText("Date");
        const routeInput = screen.getByLabelText("Route");
        const timeInput = screen.getByLabelText("Time");

        // Simulate user input
        fireEvent.change(dateInput, { target: { value: "2024-10-19" } });
        fireEvent.change(routeInput, { target: { value: "Route 123" } });
        fireEvent.change(timeInput, { target: { value: "08:00" } });

        // Verify the input values
        expect(dateInput.value).toBe("2024-10-19");
        expect(routeInput.value).toBe("Route 123");
        expect(timeInput.value).toBe("08:00");
    });

    it("submits the form successfully", async () => {
        // Mock a successful axios post request
        axios.post.mockResolvedValueOnce({ data: { message: "Route added successfully!" } });

        render(
            <BrowserRouter>
                <AddRoutes />
            </BrowserRouter>
        );

        // Get form elements
        const dateInput = screen.getByLabelText("Date");
        const routeInput = screen.getByLabelText("Route");
        const timeInput = screen.getByLabelText("Time");
        const addButton = screen.getByRole("button", { name: /Add Route/i });

        // Simulate user input
        fireEvent.change(dateInput, { target: { value: "2024-10-19" } });
        fireEvent.change(routeInput, { target: { value: "Route 123" } });
        fireEvent.change(timeInput, { target: { value: "08:00" } });

        // Simulate form submission
        fireEvent.click(addButton);

        // Wait for axios request and check if it was called with the correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("http://localhost:8070/routedetail/add-route", {
                date: "2024-10-19",
                route: "Route 123",
                time: "08:00",
            });
        });

        // Optionally, you can test the alert message (if using Jest's global alert mock)
        await waitFor(() => {
            expect(screen.queryByText(/Route Added Successfully!/i)).toBeInTheDocument();
        });
    });

    it("handles submission error", async () => {
        // Mock an axios error
        axios.post.mockRejectedValueOnce(new Error("Failed to add route"));

        render(
            <BrowserRouter>
                <AddRoutes />
            </BrowserRouter>
        );

        // Get form elements
        const dateInput = screen.getByLabelText("Date");
        const routeInput = screen.getByLabelText("Route");
        const timeInput = screen.getByLabelText("Time");
        const addButton = screen.getByRole("button", { name: /Add Route/i });

        // Simulate user input
        fireEvent.change(dateInput, { target: { value: "2024-10-19" } });
        fireEvent.change(routeInput, { target: { value: "Route 123" } });
        fireEvent.change(timeInput, { target: { value: "08:00" } });

        // Simulate form submission
        fireEvent.click(addButton);

        // Wait for axios request and check if the error alert is displayed
        await waitFor(() => {
            expect(screen.queryByText(/Failed to add route. Please try again./i)).toBeInTheDocument();
        });
    });
});
