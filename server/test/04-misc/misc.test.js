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

describe('User Index Page', () => {
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
});
