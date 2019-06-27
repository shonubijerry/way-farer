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
      it('it should not get the loan if user is not admin', (done) => {
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
            expect(res).to.have.status(422);
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
            expect(res).to.have.status(422);
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
            expect(res).to.have.status(422);
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
            expect(res).to.have.status(422);
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
            expect(res).to.have.status(422);
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
            expect(res).to.have.status(422);
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
    });
  });


  describe('GET ALL TRIPS', () => {
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
        done();
      });
  });
});
