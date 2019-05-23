import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../app';


chai.should();
chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;
let request;

describe('Users', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  it('hit api base url', async () => {
    const response = await request.get('/');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Welcome to QuickCredit');
  });

  it('hit api base url for user index', async () => {
    const response = await request.get('/api/v1');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Welcome to QuickCredit');
  });

  it('hit api base url for loan index', async () => {
    const response = await request.get('/api/v1');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Welcome to QuickCredit');
  });
/*
  // ADD CODE HERE
  it('fakes server error', async () => {
    app.use((err = new Error(), req = {}, res = { status() {}, json() {} }, next = sinon.spy()) => {
      sinon.stub(res, 'status').returnsThis();
      expect(res.status).to.have.been.calledWith(500);
      expect(next).to.have.not.been.calledOnce;
    });
  });
*/
});
