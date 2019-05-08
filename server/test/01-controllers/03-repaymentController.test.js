import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mock';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
let adminToken;

describe('Repayment', () => {
  describe('Create Repayment Record', () => {
    it('Admin should be able to create a repayment record', async () => {
      const loginResponse = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.adminLogin);

      adminToken = loginResponse.body.data.token;

      const response = await chai
        .request(app)
        .post('/api/v1/loans/6/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
    });

    it('Should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/4/repayment')
        .set('Authorization', 'Bearer WrongToken')
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(401);
    });

    it('Should return an authentication error when authorization headers are not present', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/6/repayment')
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(401);
    });

    it('Invalid data should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/6/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.invalidPaidAmount);

      expect(response.status).to.equal(400);
    });

    it('It should return a 404 error for a non-existing loanId', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/13/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(404);
    });

    it('It should return a 400 error if loan has not been approved', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/5/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error if loan has been fully repaid', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/2/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.validPaidAmount);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error if paidAmount is greater than client debt', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans/6/repayment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(mockData.createRepaymentRecord.largePaidAmount);

      expect(response.status).to.equal(400);
    });

    it('User cannot create a repayment record', async () => {
      const loginResponse = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.userLogin);

      userToken = loginResponse.body.data.token;
      const response = await chai
        .request(app)
        .post('/api/v1/loans/6/repayment')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createRepaymentRecord.largePaidAmount);

      expect(response.status).to.equal(403);
      expect(response.body).to.have.property('error');
    });
  });

  describe('View Repayment History', () => {
    it('User should be able to view repayment history of a loan', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans/3/repayments')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(200);
    });

    it('It should return a 404 error for a non-existing loanId', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans/15/repayments')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(404);
    });

    it('It should return a 400 error for unapproved loans', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans/5/repayments')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(400);
    });

    it('It should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans/3/repayments')
        .set('Authorization', 'Bearer WrongToken');

      expect(response.status).to.equal(401);
    });

    it('Should return an authentication error when authorization headers are not present', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans/3/repayments');

      expect(response.status).to.equal(401);
    });
  });
});
