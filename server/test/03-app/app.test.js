import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('QuickCredit', () => {
  it('It should be able to catch all undefined routes', async () => {
    const response = await chai.request(app).get('/undefined');
    expect(response.status).to.equal(404);
  });
});


describe('Root path', () => {
  it('should return status: 200', async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(200);
  });

  it('should return a message', async () => {
    const res = await chai.request(app).get('/');
    expect(res.body.message).to.equal('Welcome to QuickCredit');
  });

  it('should return object response', async () => {
    const res = await chai.request(app).get('/');
    expect(res.body).to.be.an('object');
  });
});
