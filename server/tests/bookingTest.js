/* eslint-disable max-len */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import errorStrings from '../helpers/errorStrings';

chai.use(chaiHttp);
const { expect } = chai;

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const bookingUrl = '/api/v1/bookings';

describe('BOOKING CONTROLLER', () => {
  it('it should return authentication error', (done) => {
    const trip_id = 'aaac8272-4b57-423c-906f-3da93e823f49'; // active trip
    chai.request(app)
      .post(bookingUrl)
      .send({ trip_id })
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.notAuthenticated);
        done();
      });
  });
  describe('POST A BOOKING', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'adenekan2017@gmail.com',
          password: 'olujac1$',
        })
        .end((error, res) => {
          currentToken = res.body.data.token;
          done();
        });
    });
    it('it should create a booking', (done) => {
      const trip_id = 'ccc58272-4b57-423c-906f-3da93e823f49'; // active trip_id
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('booking_id');
          expect(res.body.data).to.have.property('user_id');
          expect(res.body.data).to.have.property('trip_id');
          expect(res.body.data).to.have.property('bus_id');
          expect(res.body.data).to.have.property('trip_date');
          expect(res.body.data).to.have.property('seat_number');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('created_on');
          done();
        });
    });

    it('it should not create a booking with invalid trip_id', (done) => {
      const trip_id = 'aaac8272-4b57-423c-906f-3da93e823f49-525tt'; // invalid trip_id
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validTripId);
          done();
        });
    });

    it('it should not create a booking with empty trip_id', (done) => {
      const trip_id = ''; // invalid trip_id
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validTripId);
          done();
        });
    });

    it('it should not create a booking with empty seat_number', (done) => {
      const trip_id = 'ccc58272-4b57-423c-906f-3da93e823f49'; // valid trip_id
      const seat_number = ''; // empty seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.invalidSeatNumber);
          done();
        });
    });

    it('it should not create a booking with invalid seat_number', (done) => {
      const trip_id = 'ccc58272-4b57-423c-906f-3da93e823f49'; // valid trip_id
      const seat_number = '3e'; // invalid seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.invalidSeatNumber);
          done();
        });
    });

    it('it should not create a booking with non-existence trip_id', (done) => {
      const trip_id = '45bc8272-4b57-423c-906f-3da93e823e48'; // invalid trip_id
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.tripNotFound);
          done();
        });
    });

    it('it should not create a booking for a cancelled trip', (done) => {
      const trip_id = 'bbbc8272-4b57-423c-906f-3da93e823f49'; // cancelled trip
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.cancelledTrip);
          done();
        });
    });

    it('it should not create a booking if seat number is already booked', (done) => {
      const trip_id = 'ccc58272-4b57-423c-906f-3da93e823f49'; // active trip
      const seat_number = 22; // already booked seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Seat number 22 is booked. Check available seats with GET /bookings/:tripId/availableSeats');
          done();
        });
    });

    it('it should not create a booking for a past trip', (done) => {
      const trip_id = 'dddc8272-4b57-423c-906f-3da93e823f49'; // past trip
      const seat_number = 17; // available seat number
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id, seat_number })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.pastTrip);
          done();
        });
    });
  });

  describe('GET BOOKINGS', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .get(bookingUrl)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });

    describe('User should get their bookings', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'ciromalapai@hotmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all trips for a user', (done) => {
        chai.request(app)
          .get(bookingUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('booking_id');
            expect(res.body.data[0]).to.have.property('user_id');
            expect(res.body.data[0]).to.have.property('bus_id');
            expect(res.body.data[0]).to.have.property('trip_id');
            expect(res.body.data[0]).to.have.property('trip_date');
            expect(res.body.data[0]).to.have.property('seat_number');
            expect(res.body.data[0]).to.have.property('first_name');
            expect(res.body.data[0]).to.have.property('last_name');
            expect(res.body.data[0]).to.have.property('email');
            expect(res.body.data[0]).to.have.property('created_on');
            done();
          });
      });
    });
  });

  describe('DELETE A BOOKING', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .get(bookingUrl)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });

    describe('User should delete a booking', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'ciromalapai@hotmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should delete a booking', (done) => {
        chai.request(app)
          .delete(`${bookingUrl}/abcc8272-4b57-423c-906f-3da93e823f66`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('message');
            expect(res.body.data.message).to.equal('Booking deleted successfully');
            done();
          });
      });

      it('It should not delete a non-existence booking', (done) => {
        chai.request(app)
          .delete(`${bookingUrl}/23368272-4b57-423c-906f-3da93e823f63`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.bookingNotFound);
            done();
          });
      });

      it('It should not delete a booking if invalid bookingId', (done) => {
        chai.request(app)
          .delete(`${bookingUrl}/23368272-4b57-423c-906f-3da93e823f63-4etys`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validBookingId);
            done();
          });
      });

      it('It should not delete a booking if bookingId is empty', (done) => {
        chai.request(app)
          .delete(`${bookingUrl}/`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.pageNotFound);
            done();
          });
      });
    });
  });

  describe('GET AVAILABLE SEAT NUMBERS', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .get(`${bookingUrl}/aaac8272-4b57-423c-906f-3da93e823f49/availableSeats`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });

    describe('User should get available booking numbers', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'ciromalapai@hotmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all available seats for a specific trip', (done) => {
        chai.request(app)
          .get(`${bookingUrl}/bbbc8272-4b57-423c-906f-3da93e823f49/availableSeats`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            expect(res.body.data.available_seats).to.be.a('array');
            expect(res.body.data.available_seats[0]).to.be.a('number');
            done();
          });
      });

      it('It should get available seats if trip id is invalid', (done) => {
        chai.request(app)
          .get(`${bookingUrl}/aaac8272-4b57-423c-906f-3da93e823f48/availableSeats`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.tripNotFound);
            done();
          });
      });

      it('It should get available seats if trip id is invalid', (done) => {
        chai.request(app)
          .get(`${bookingUrl}/aaac8272-4b57-423c-906f-3da93e823f49-77763y/availableSeats`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validTripId);
            done();
          });
      });
    });
  });
});
