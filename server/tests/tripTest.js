/* eslint-disable max-len */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import errorStrings from '../helpers/errorStrings';
import testData from './testData';

chai.use(chaiHttp);
const { expect } = chai;

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const tripUrl = '/api/v1/trips';

describe('TRIP CONTROLLER', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .post(tripUrl)
      .send(testData.trip[0])
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.notAuthenticated);
        done();
      });
  });

  describe('POST A TRIP', () => {
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'adenekan2017@gmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not post a trip if user is not admin', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });
    });
    describe('Admin should post trip', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'shonubijerry@gmail.com',
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should create a trip', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('bus_id');
            expect(res.body.data).to.have.property('origin');
            expect(res.body.data).to.have.property('destination');
            expect(res.body.data).to.have.property('trip_date');
            expect(res.body.data).to.have.property('fare');
            expect(res.body.data).to.have.property('status');
            done();
          });
      });

      it('it should not create a trip with invalid bus_id', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[1])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validBusId);
            done();
          });
      });

      it('it should not create a trip with empty origin', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[2])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validOrigin);
            done();
          });
      });

      it('it should not create a trip with empty destination', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[3])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validDestination);
            done();
          });
      });

      it('it should not create a trip with empty date', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[5])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validTripDate);
            done();
          });
      });

      it('it should not create a trip with invalid fare', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[6])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validFare);
            done();
          });
      });

      it('it should not create a trip with empty fare', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[7])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validFare);
            done();
          });
      });

      it('it should not create a trip if bus is not available', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[8])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.busNotAvailable);
            done();
          });
      });

      it('it should not create a trip if bus does not exist', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[9])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.busNotFound);
            done();
          });
      });

      it('it should not create a trip if trip_date is in the past', (done) => {
        chai.request(app)
          .post(tripUrl)
          .send(testData.trip[10])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
  });


  describe('GET TRIPS', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .get(tripUrl)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('Admin and user should get all trips', () => {
      it('it should get all trips for admin', (done) => {
        chai.request(app)
          .get(tripUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('bus_id');
            expect(res.body.data[0]).to.have.property('origin');
            expect(res.body.data[0]).to.have.property('destination');
            expect(res.body.data[0]).to.have.property('trip_date');
            expect(res.body.data[0]).to.have.property('fare');
            expect(res.body.data[0]).to.have.property('status');
            done();
          });
      });
    });

    describe('User should get all trips', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'adenekan2017@gmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all trips for a user', (done) => {
        chai.request(app)
          .get(tripUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('bus_id');
            expect(res.body.data[0]).to.have.property('origin');
            expect(res.body.data[0]).to.have.property('destination');
            expect(res.body.data[0]).to.have.property('trip_date');
            expect(res.body.data[0]).to.have.property('fare');
            expect(res.body.data[0]).to.have.property('status');
            done();
          });
      });

      it('It should get all filtered trips by origin', (done) => {
        chai.request(app)
          .get(`${tripUrl}?filter_by=origin`)
          .set('Authorization', currentToken)
          .send({ filter_value: 'Lagos' })
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('bus_id');
            expect(res.body.data[0]).to.have.property('origin');
            expect(res.body.data[0]).to.have.property('destination');
            expect(res.body.data[0]).to.have.property('trip_date');
            expect(res.body.data[0]).to.have.property('fare');
            expect(res.body.data[0]).to.have.property('status');
            done();
          });
      });

      it('It should get all filtered trips by destination', (done) => {
        chai.request(app)
          .get(`${tripUrl}?filter_by=destination`)
          .set('Authorization', currentToken)
          .send({ filter_value: 'Abuja' })
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('bus_id');
            expect(res.body.data[0]).to.have.property('origin');
            expect(res.body.data[0]).to.have.property('destination');
            expect(res.body.data[0]).to.have.property('trip_date');
            expect(res.body.data[0]).to.have.property('fare');
            expect(res.body.data[0]).to.have.property('status');
            done();
          });
      });
      it('it should return empty data if query not matched any row', (done) => {
        chai.request(app)
          .get(`${tripUrl}?filter_by=origin`)
          .set('Authorization', currentToken)
          .send({ filter_value: 'Maiduguri' })
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.equal('success');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.eql([]);
            done();
          });
      });
      it('it should not get trips if url is not a valid query', (done) => {
        chai.request(app)
          .get(`${tripUrl}?filter_by=original`)
          .set('Authorization', currentToken)
          .send({ filter_value: 'Maiduguri' })
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.pageNotFound);
            done();
          });
      });
      it('it should not get filtered trips with empty filter value', (done) => {
        chai.request(app)
          .get(`${tripUrl}?filter_by=origin`)
          .set('Authorization', currentToken)
          .send({ filter_value: '' })
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validFilterValue);
            done();
          });
      });
    });
  });
  describe('CANCEL A TRIP', () => {
    it('it should return authentication error', (done) => {
      const tripId = 'aaac8272-4b57-423c-906f-3da93e823f49'; // active trip
      chai.request(app)
        .patch(`${tripUrl}/${tripId}`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'adenekan2017@gmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not cancel a trip if user is not admin', (done) => {
        const tripId = 'aaac8272-4b57-423c-906f-3da93e823f49'; // active trip
        chai.request(app)
          .patch(`${tripUrl}/${tripId}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });
    });
    describe('Cancel a trip for admin', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'shonubijerry@gmail.com', // this user is not an admin
            password: 'olujac1$',
          })
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should cancel a trip', (done) => {
        const tripId = 'aaac8272-4b57-423c-906f-3da93e823f49'; // active trip
        chai.request(app)
          .patch(`${tripUrl}/${tripId}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('bus_id');
            expect(res.body.data).to.have.property('origin');
            expect(res.body.data).to.have.property('destination');
            expect(res.body.data).to.have.property('trip_date');
            expect(res.body.data).to.have.property('fare');
            expect(res.body.data).to.have.property('status');
            expect(res.body.data).to.have.property('message');
            done();
          });
      });

      it('it should not cancel a trip if trip is already cancelled', (done) => {
        const tripId = 'bbbc8272-4b57-423c-906f-3da93e823f49'; // cancelled trip
        chai.request(app)
          .patch(`${tripUrl}/${tripId}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(202);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.alreadyCancelled);
            done();
          });
      });

      it('it should not cancel a trip if it does not exist', (done) => {
        const tripId = '344c8272-4b57-423c-906f-3da93e823f48'; // valid trip id
        chai.request(app)
          .patch(`${tripUrl}/${tripId}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.tripNotFound);
            done();
          });
      });

      it('it should not cancel a trip if tripId is invalid', (done) => {
        const tripId = '344c8272-4b57-423c-906f-3da93e823f48qw'; // invalid trip id
        chai.request(app)
          .patch(`${tripUrl}/${tripId}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validTripId);
            done();
          });
      });
    });
  });
});

describe('Expired session', () => {
  it('it Return session expired for a user', (done) => {
    chai.request(app)
      .get(tripUrl)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIwYzRiLTFkNGEtNGU0NC04YjA5LTY2ZTM1NTRjMDQ1YiIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTYxNjYxOTQ5LCJleHAiOjE1NjE2NjIwMzV9.kTXgIDGjKOaQ5cB36o2D3wyV4UEA_w0R37OiKu4je70')
      .end((error, res) => {
        expect(res).to.have.status(419);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.sessionExpired);
        done();
      });
  });

  it('it Return session expired for admin', (done) => {
    chai.request(app)
      .post(tripUrl)
      .send(testData.trip[0])
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIwYzRiLTFkNGEtNGU0NC04YjA5LTY2ZTM1NTRjMDQ1YiIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTYxNjYxOTQ5LCJleHAiOjE1NjE2NjIwMzV9.kTXgIDGjKOaQ5cB36o2D3wyV4UEA_w0R37OiKu4je70')
      .end((error, res) => {
        expect(res).to.have.status(419);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.sessionExpired);
        done();
      });
  });
});
