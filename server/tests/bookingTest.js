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
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
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
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
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
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validTripId);
          done();
        });
    });

    it('it should not create a booking with non-existence trip_id', (done) => {
      const trip_id = '45bc8272-4b57-423c-906f-3da93e823e48'; // invalid trip_id
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.noTrip);
          done();
        });
    });

    it('it should not create a booking for a cancelled trip', (done) => {
      const trip_id = 'bbbc8272-4b57-423c-906f-3da93e823f49'; // cancelled trip
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.cancelledTrip);
          done();
        });
    });

    it('it should not create a booking for a past trip', (done) => {
      const trip_id = 'dddc8272-4b57-423c-906f-3da93e823f49'; // past trip
      chai.request(app)
        .post(bookingUrl)
        .send({ trip_id })
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
});
