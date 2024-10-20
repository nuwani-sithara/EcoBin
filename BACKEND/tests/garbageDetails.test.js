const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Point this to your Express app

describe('Garbage Management', () => {

    // Test case 1: Successfully add garbage details
    it('should add garbage details successfully', async () => {
        const garbageDetails = {
            name: 'John Doe',
            contactNumber: '1234567890',
            type: 'Plastic',
            weight: 5,
            additionalNotes: 'Recyclable'
        };

        const res = await request(app)
            .post('/addgarbageDetails')
            .send(garbageDetails);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Garbage Details Added...');
        expect(res.body).to.have.property('garbageId');
    });

    // Negative Test Case: Missing required fields while adding garbage details
    it('should fail to add garbage details when fields are missing', async () => {
        const incompleteDetails = {
            name: 'John Doe',
            contactNumber: '1234567890'
            // missing type, weight, additionalNotes
        };

        const res = await request(app)
            .post('/addgarbageDetails')
            .send(incompleteDetails);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('All fields are required.');
    });

    // Test case 2: Fetch all garbage details
    it('should fetch all garbage details', async () => {
        const res = await request(app)
            .get('/allgarbageDetails');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // Test case 3: Successfully update garbage details
    it('should update garbage details successfully', async () => {
        const garId = 'some_valid_garbage_id'; // Replace with an actual ID

        const updatedDetails = {
            name: 'Jane Doe',
            contactNumber: '0987654321',
            type: 'Paper',
            weight: 10,
            additionalNotes: 'Non-recyclable'
        };

        const res = await request(app)
            .put(`/updategarbageDetails/${garId}`)
            .send(updatedDetails);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Garbage Details updated successfully');
        expect(res.body.garbage.name).to.equal('Jane Doe');
        expect(res.body.garbage.weight).to.equal(10);
    });

    // Negative Test Case: Update with invalid ID
    it('should fail to update garbage details with an invalid ID', async () => {
        const invalidGarId = 'invalid_id';

        const updatedDetails = {
            name: 'Jane Doe',
            contactNumber: '0987654321',
            type: 'Paper',
            weight: 10,
            additionalNotes: 'Non-recyclable'
        };

        const res = await request(app)
            .put(`/updategarbageDetails/${invalidGarId}`)
            .send(updatedDetails);

        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Garbage details not found.');
    });

    // Test case 4: Delete garbage details
    it('should delete garbage details successfully', async () => {
        const garId = 'some_valid_garbage_id'; // Replace with an actual ID

        const res = await request(app)
            .delete(`/deletegarbageDetails/${garId}`);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Garbage Details deleted');
    });

    // Negative Test Case: Delete with invalid ID
    it('should fail to delete garbage details with an invalid ID', async () => {
        const invalidGarId = 'invalid_id';

        const res = await request(app)
            .delete(`/deletegarbageDetails/${invalidGarId}`);

        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Garbage details not found.');
    });

    // Test case 5: Get garbage details by ID
    it('should fetch garbage details by ID', async () => {
        const garId = 'some_valid_garbage_id'; // Replace with an actual ID

        const res = await request(app)
            .get(`/getgarbage/${garId}`);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Garbage details fetched');
        expect(res.body.garbage).to.have.property('name');
    });

    // Negative Test Case: Get garbage details with invalid ID
    it('should fail to fetch garbage details with an invalid ID', async () => {
        const invalidGarId = 'invalid_id';

        const res = await request(app)
            .get(`/getgarbage/${invalidGarId}`);

        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('Garbage details not found');
    });
});
