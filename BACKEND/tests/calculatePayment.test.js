const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to your server file
const CalculatePayment = require('../models/calculatePayment');

beforeAll(async () => {
    const url = 'mongodb://localhost:27017/test'; // Change to your test DB URI
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Payment API Tests', () => {
    let paymentId;

    // Positive Test Case: Create a new payment
    test('should create a new payment', async () => {
        const response = await request(app)
            .post('/addpaymentdetails')
            .send({ garbageId: '60e0b54c4f1a2c001f8c9c18', amount: 100 }); // Replace with a valid garbageId

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id'); // Ensure the response has an ID
        paymentId = response.body._id; // Save ID for later tests
    });

    // Positive Test Case: Get all payments
    test('should get all payments', async () => {
        const response = await request(app).get('/getallpaymentdetails');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Ensure the response is an array
    });

    // Negative Test Case: Get payment by non-existent ID
    test('should return 404 for a non-existent payment', async () => {
        const response = await request(app).get('/getpaymentdetails/60e0b54c4f1a2c001f8c9c19'); // Non-existent ID
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Payment not found');
    });

    // Positive Test Case: Get payment by valid ID
    test('should get a payment by ID', async () => {
        const response = await request(app).get(`/getpaymentdetails/${paymentId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', paymentId); // Check if the ID matches
    });

    // Negative Test Case: Update payment with invalid data
    test('should return 500 when updating payment with invalid data', async () => {
        const response = await request(app)
            .put(`/updatepaymentdetails/${paymentId}`)
            .send({ amount: 'invalid_amount', status: 'paid' }); // Invalid amount

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Failed to update payment');
    });

    // Positive Test Case: Update a payment
    test('should update a payment by ID', async () => {
        const response = await request(app)
            .put(`/updatepaymentdetails/${paymentId}`)
            .send({ amount: 200, status: 'paid' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('amount', 200);
    });

    // Negative Test Case: Delete a payment that doesn't exist
    test('should return 404 for deleting a non-existent payment', async () => {
        const response = await request(app).delete('/deletepaymentdetails/60e0b54c4f1a2c001f8c9c19'); // Non-existent ID
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Payment not found');
    });

    // Positive Test Case: Delete a payment
    test('should delete a payment by ID', async () => {
        const response = await request(app).delete(`/deletepaymentdetails/${paymentId}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Payment deleted successfully');
    });
});
