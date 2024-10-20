const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); // Ensure you point this to your server entry point
const Schedule = require('../models/scheduleTime');
const { expect } = chai;

chai.use(chaiHttp);

describe('Schedule API Tests', () => {

    // Clean up the test database after each test
    afterEach(async () => {
        await Schedule.deleteMany({});
    });

    // Test case 1: Positive - Add a new schedule
    it('should add a new schedule successfully', (done) => {
        const newSchedule = {
            address: "123 Main St",
            district: "Colombo",
            dateTime: new Date()
        };

        chai.request(server)
            .post('/addschedule')
            .send(newSchedule)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Schedule Details Added...');
                expect(res.body).to.have.property('scheduleId');
                done();
            });
    });

    // Test case 2: Negative - Add schedule with missing fields
    it('should return error for missing required fields', (done) => {
        const incompleteSchedule = {
            address: "123 Main St"
            // Missing district and dateTime
        };

        chai.request(server)
            .post('/addschedule')
            .send(incompleteSchedule)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').eql('All fields are required.');
                done();
            });
    });

    // Test case 3: Positive - Get all schedules
    it('should get all schedules', (done) => {
        // First add a new schedule
        const schedule = new Schedule({
            address: "123 Main St",
            district: "Colombo",
            dateTime: new Date()
        });

        schedule.save().then(() => {
            chai.request(server)
                .get('/allscheduleDetails')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.eql(1); // Since we added one schedule
                    done();
                });
        });
    });

    // Test case 4: Negative - Update schedule with invalid ID
    it('should return error for updating non-existent schedule', (done) => {
        const invalidScheduleId = '609edbbe40e4e01b40b17d35'; // Random or non-existent ID
        const updateDetails = {
            address: "New Address",
            district: "Galle",
            dateTime: new Date()
        };

        chai.request(server)
            .put(`/updateschedule/${invalidScheduleId}`)
            .send(updateDetails)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error').eql('Schedule not found.');
                done();
            });
    });

    // Test case 5: Positive - Delete schedule successfully
    it('should delete a schedule successfully', (done) => {
        // First add a schedule
        const schedule = new Schedule({
            address: "123 Main St",
            district: "Colombo",
            dateTime: new Date()
        });

        schedule.save().then((savedSchedule) => {
            chai.request(server)
                .delete(`/deleteschedule/${savedSchedule._id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status').eql('Schedule details deleted');
                    done();
                });
        });
    });

    // Test case 6: Negative - Confirm schedule with invalid ID
    it('should return error for confirming non-existent schedule', (done) => {
        const invalidScheduleId = '609edbbe40e4e01b40b17d35'; // Random or non-existent ID

        chai.request(server)
            .post('/confirm')
            .send({ scheduleId: invalidScheduleId })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('status').eql('Schedule details not found');
                done();
            });
    });

});
