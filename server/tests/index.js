import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import errorStrings from '../helpers/errorStrings';

chai.use(chaiHttp);
chai.should();

describe('Home page', () => {
  it('it should take users to the landing page', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Page Not Found', () => {
  it('it should return error for invalid page', (done) => {
    chai.request(app)
      .get('/wrong_url.html')
      .end((error, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal(errorStrings.pageNotFound);
        done();
      });
  });
});
