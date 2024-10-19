import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AddWasteUser from "./AddWasteUser"; // Adjust the import path as necessary

jest.mock("axios");

describe("AddWasteUser Component", () => {
    const userEmail = "test@example.com";

    beforeEach(() => {
        localStorage.setItem("userEmail", userEmail);
        axios.get.mockImplementation((url) => {
            if (url === "http://localhost:8070/category/view-categories") {
                return Promise.resolve({ data: [{ _id: "1", name: "Plastic" }, { _id: "2", name: "Paper" }] });
            }
            if (url === "http://localhost:8070/routedetail/view-route") {
                return Promise.resolve({
                    data: [
                        { _id: "r1", route: "Route 1", date: "2023-10-01T00:00:00Z", time: "10:00 AM" },
                        { _id: "r2", route: "Route 2", date: "2023-10-02T00:00:00Z", time: "2:00 PM" },
                    ],
                });
            }
            return Promise.reject(new Error("Not Found"));
        });
    });

    afterEach(() => {
        localStorage.clear();
    });

    test("renders AddWasteUser component", async () => {
        render(
            <Router>
                <AddWasteUser />
            </Router>
        );

        expect(screen.getByText(/Add Your Waste/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toHaveValue(userEmail);
        expect(await screen.findByLabelText(/Select Waste Category/i)).toBeInTheDocument();
    });

    test("fetches categories and routes on mount", async () => {
        render(
            <Router>
                <AddWasteUser />
            </Router>
        );

        expect(await screen.findByText(/Plastic/i)).toBeInTheDocument();
        expect(await screen.findByText(/Paper/i)).toBeInTheDocument();
        expect(await screen.findByText(/Route 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Route 2/i)).toBeInTheDocument();
    });

    test("adds a waste entry", async () => {
        render(
            <Router>
                <AddWasteUser />
            </Router>
        );

        // Add waste details
        fireEvent.change(screen.getByLabelText(/Select Waste Category/i), {
            target: { value: "1" },
        });
        fireEvent.change(screen.getByLabelText(/Waste/i), {
            target: { value: "Plastic Bottle" },
        });
        fireEvent.change(screen.getByLabelText(/Enter Weight/i), {
            target: { value: "1.5" },
        });
        fireEvent.change(screen.getByLabelText(/Select Route/i), {
            target: { value: "Route 1" },
        });

        // Submit the form
        axios.post.mockResolvedValueOnce({});
        fireEvent.click(screen.getByText(/Add Waste/i));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("http://localhost:8070/wastedetail/add-waste-multiple", {
                wasteDetails: [
                    { email: userEmail, category: "1", waste: "Plastic Bottle", weight: "1.5", weightType: "", route: "Route 1" },
                ],
            });
            expect(screen.getByText(/Successfully added waste/i)).toBeInTheDocument();
        });
    });

    test("removes a waste entry", async () => {
        render(
            <Router>
                <AddWasteUser />
            </Router>
        );

        // Wait for categories to be loaded
        await screen.findByLabelText(/Select Waste Category/i);

        // Add another waste entry
        fireEvent.click(screen.getByText(/Add Another Waste Entry field/i));

        // Check that the waste entry field has been added
        expect(screen.getAllByLabelText(/Select Waste Category/i)).toHaveLength(2);

        // Remove the added waste entry
        fireEvent.click(screen.getAllByText(/Remove Waste Entry/i)[1]);
        expect(screen.getAllByLabelText(/Select Waste Category/i)).toHaveLength(1);
    });
});
