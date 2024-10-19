import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import AddCategory from "./AddCategory";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

describe("AddCategory Component", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it("renders the AddCategory form", () => {
        render(
            <BrowserRouter>
                <AddCategory />
            </BrowserRouter>
        );

        // Check if form elements are rendered
        expect(screen.getByText("Add New Category")).toBeInTheDocument();
        expect(screen.getByLabelText("Category Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Description (Optional)")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Add Category/i })).toBeInTheDocument();
    });

    it("allows input changes", () => {
        render(
            <BrowserRouter>
                <AddCategory />
            </BrowserRouter>
        );

        // Get input fields
        const nameInput = screen.getByLabelText("Category Name");
        const descriptionInput = screen.getByLabelText("Description (Optional)");

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: "New Category" } });
        fireEvent.change(descriptionInput, { target: { value: "Category description" } });

        // Verify the input values
        expect(nameInput.value).toBe("New Category");
        expect(descriptionInput.value).toBe("Category description");
    });

    it("submits the form successfully", async () => {
        // Mock a successful axios post request
        axios.post.mockResolvedValueOnce({ data: { message: "Category added successfully!" } });

        render(
            <BrowserRouter>
                <AddCategory />
            </BrowserRouter>
        );

        // Get form elements
        const nameInput = screen.getByLabelText("Category Name");
        const descriptionInput = screen.getByLabelText("Description (Optional)");
        const addButton = screen.getByRole("button", { name: /Add Category/i });

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: "New Category" } });
        fireEvent.change(descriptionInput, { target: { value: "Category description" } });

        // Simulate form submission
        fireEvent.click(addButton);

        // Wait for axios request and check if it was called with the correct data
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8070/category/add-category", {
            name: "New Category",
            description: "Category description",
        });

        // Optionally, you can test the alert message (if using Jest's global alert mock)
        await screen.findByText(/Category Added Successfully!/i);
    });

    it("handles submission error", async () => {
        // Mock an axios error
        axios.post.mockRejectedValueOnce(new Error("Failed to add category"));

        render(
            <BrowserRouter>
                <AddCategory />
            </BrowserRouter>
        );

        // Get form elements
        const nameInput = screen.getByLabelText("Category Name");
        const descriptionInput = screen.getByLabelText("Description (Optional)");
        const addButton = screen.getByRole("button", { name: /Add Category/i });

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: "New Category" } });
        fireEvent.change(descriptionInput, { target: { value: "Category description" } });

        // Simulate form submission
        fireEvent.click(addButton);

        // Wait for axios request and check if the error alert is displayed
        await screen.findByText(/Failed to add category. Please try again./i);
    });
});
