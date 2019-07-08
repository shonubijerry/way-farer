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
const busUrl = '/api/v1/buses';

describe('BUS CONTROLLER', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .post(busUrl)
      .send(testData.bus[0])
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.notAuthenticated);
        done();
      });
  });

  describe('POST A BUS', () => {
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
      it('it should not create a bus if user is not admin', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[0])
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
    describe('Admin should create a bus', () => {
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
      it('it should create a bus', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('number_plate');
            expect(res.body.data).to.have.property('manufacturer');
            expect(res.body.data).to.have.property('model');
            expect(res.body.data).to.have.property('year');
            expect(res.body.data).to.have.property('capacity');
            expect(res.body.data).to.have.property('created_on');
            done();
          });
      });

      it('it should not create a bus with invalid number_plate', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[1])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validPlateNumber);
            done();
          });
      });

      it('it should not create a bus with empty number_plate', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[2])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validPlateNumber);
            done();
          });
      });

      it('it should not create a bus if number_plate already exists', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('Bus with number plate KJA-675-WA has already been added');
            done();
          });
      });

      it('it should not create a bus with empty manufacturer', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[3])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.nonEmptyManufacturer);
            done();
          });
      });

      it('it should not create a bus with empty model', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[4])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.nonEmptyModel);
            done();
          });
      });

      it('it should not create a bus with invalid manufacture year', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[5])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validYear);
            done();
          });
      });

      it('it should not create a bus with empty manufacture year', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[6])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.nonEmptyYear);
            done();
          });
      });

      it('it should not create a bus with invalid bus', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[7])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validCapacity);
            done();
          });
      });

      it('it should not create a bus with empty bus capacity', (done) => {
        chai.request(app)
          .post(busUrl)
          .send(testData.bus[8])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validCapacity);
            done();
          });
      });
    });
  });
  describe('GET BUSES', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .get(busUrl)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('Admin and user should get all buses', () => {
      it('it should get all buses for admin', (done) => {
        chai.request(app)
          .get(busUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('number_plate');
            expect(res.body.data[0]).to.have.property('manufacturer');
            expect(res.body.data[0]).to.have.property('model');
            expect(res.body.data[0]).to.have.property('year');
            expect(res.body.data[0]).to.have.property('capacity');
            expect(res.body.data[0]).to.have.property('created_on');
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

      it('It should get all buses for a user', (done) => {
        chai.request(app)
          .get(busUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('number_plate');
            expect(res.body.data[0]).to.have.property('manufacturer');
            expect(res.body.data[0]).to.have.property('model');
            expect(res.body.data[0]).to.have.property('year');
            expect(res.body.data[0]).to.have.property('capacity');
            expect(res.body.data[0]).to.have.property('created_on');
            done();
          });
      });
    });
  });
});
