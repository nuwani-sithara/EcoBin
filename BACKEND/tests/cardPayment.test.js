const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Make sure to point this to your actual Express app

describe('Payment Processing', () => {

    // Test case 1: Successful Online Payment
    it('should process an online payment successfully', async () => {
        const paymentDetails = {
            paymentMethod: 'online',
            cardNumber: '4111111111111111',
            expiryDate: '12/24',
            cvv: '123',
            saveCard: true
        };

        const res = await request(app)
            .post('/addpaymentdetails')
            .send(paymentDetails);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Payment processed successfully!');
        expect(res.body.details.paymentMethod).to.equal('online');
        expect(res.body.details.amount).to.equal('Rs.350.00');
    });

    // Negative Test Case: Missing Card Number in Online Payment
    it('should fail to process an online payment when card number is missing', async () => {
        const paymentDetails = {
            paymentMethod: 'online',
            expiryDate: '12/24',
            cvv: '123',
            saveCard: true
        };

        const res = await request(app)
            .post('/addpaymentdetails')
            .send(paymentDetails);

        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Error processing payment');
    });

    // Test case 2: Successful Offline Payment
    it('should process an offline payment successfully', async () => {
        const paymentDetails = {
            paymentMethod: 'offline',
            saveCard: false
        };

        const res = await request(app)
            .post('/addpaymentdetails')
            .send(paymentDetails);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Payment processed successfully!');
        expect(res.body.details.paymentMethod).to.equal('offline');
        expect(res.body.details.amount).to.equal('Rs.350.00');
    });

    // Negative Test Case: Invalid Card Details for Offline Payment
    it('should process an offline payment even if invalid card details are provided', async () => {
        const paymentDetails = {
            paymentMethod: 'offline',
            cardNumber: 'invalid', // Invalid card number should not matter
            expiryDate: 'invalid',
            cvv: 'invalid',
            saveCard: false
        };

        const res = await request(app)
            .post('/addpaymentdetails')
            .send(paymentDetails);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Payment processed successfully!');
        expect(res.body.details.paymentMethod).to.equal('offline');
    });

    // Test case 3: Missing Payment Method
    it('should fail when no payment method is provided', async () => {
        const paymentDetails = {
            cardNumber: '4111111111111111',
            expiryDate: '12/24',
            cvv: '123',
            saveCard: true
        };

        const res = await request(app)
            .post('/addpaymentdetails')
            .send(paymentDetails);

        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Error processing payment');
    });

    // Test case 4: Get all payment details
    it('should retrieve all payment details', async () => {
        const res = await request(app)
            .get('/getallpaymentdetails');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0); // Assuming there are payment records
    });

    // Test case 5: Get payment by ID
    it('should retrieve payment details by ID', async () => {
        const paymentId = 'some_valid_payment_id'; // Replace with actual ID for testing

        const res = await request(app)
            .get(`/getpaymentdetails/${paymentId}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('paymentMethod');
        expect(res.body).to.have.property('amount');
    });

    // Negative Test Case: Retrieve payment with invalid ID
    it('should return 404 when payment with invalid ID is requested', async () => {
        const invalidId = 'invalid_payment_id';

        const res = await request(app)
            .get(`/getpaymentdetails/${invalidId}`);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Payment not found');
    });
});
