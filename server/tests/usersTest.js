import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../app';
import errorStrings from '../helpers/errorStrings';


const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';

describe('USER CONTROLLER', () => {
  describe('POST SIGN UP', () => {
    it(`it should register a user with POST ${signupUrl}`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'koredujar@gmail.com',
          first_name: 'Korede',
          last_name: 'Dujar',
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('user_id');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('is_admin');
          done();
        });
    });

    it('it should not register a user with empty first_name or last_name', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'adenekan@gmail.info',
          first_name: '', // empty name
          last_name: 'Quadri',
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validName);
          done();
        });
    });

    it('it should not register a user with invalid first_name or last_name', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'adenekan@gmail.info',
          first_name: 'John',
          last_name: '#Quad%ri*', // invalid name
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validName);
          done();
        });
    });

    it('it should not register a user with invalid email', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'adenekagmail.info', // invalid email
          first_name: 'Baba',
          last_name: 'Quadri',
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validEmail);
          done();
        });
    });

    it('it should not register a user with same email twice', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'shonubijerry@gmail.com', // email already exist
          first_name: 'Baba',
          last_name: 'Quadri',
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.emailExists);
          done();
        });
    });

    it('it should not register a user with password less than 8 characters', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'shonubi@ymail.com',
          first_name: 'Baba',
          last_name: 'Quadri',
          password: 'adann', // password length short
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.passwordLength);
          done();
        });
    });

    it('it should not register a user with empty password field', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'shonubi@ymail.com',
          first_name: 'Baba',
          last_name: 'Quadri',
          password: '', // empty password
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.passwordEmpty);
          done();
        });
    });
  });

  describe('POST SIGN IN', () => {
    it('it should login a user with valid email and password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'shonubijerry@gmail.com', // valid login details
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('user_id');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('is_admin');
          done();
        });
    });

    it('it should not login a user with invalid email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'shonubijerrygmail.com', // invalid login email
          password: 'olujac1$',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validEmail);
          done();
        });
    });

    it('it should not login a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'shonubijerry@gmail.com',
          password: '', // empty login password
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.passwordEmpty);
          done();
        });
    });

    it('it should not login a user with wrong login email or password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'shonubijerry@gmail.com',
          password: 'olujac1', // incorrect login password
        })
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.loginFailure);
          done();
        });
    });
  });
});
