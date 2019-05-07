import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mock';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
let adminToken;

describe('Loan', () => {
  describe('Create Loan', () => {
    it('User should be able to create a loan application', async () => {
      const loginResponse = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.userLogin);

      userToken = loginResponse.body.data.token;

      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.validLoan);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
    });

    it('Should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', 'Bearer WrongToken')
        .send(mockData.createLoan.validLoan);

      expect(response.status).to.equal(401);
    });

    it('Should return an authentication error when authorization headers are not present', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .send(mockData.createLoan.validLoan);

      expect(response.status).to.equal(401);
    });

    it('Wrong loan details should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.invalidLoan);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error when email entered is not the same as user email', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.differentEmail);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error when first name entered is not the same as user first name', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.differentFirstName);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error when last name entered is not the same as user last name', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.differentLastName);

      expect(response.status).to.equal(400);
    });

    it('User can apply for one loan at a time', async () => {
      const userLogin = {
        email: 'kimble@gmail.com',
        password: 'awesome21',
      };
      const loginResponse = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(userLogin);

      userToken = loginResponse.body.data.token;
      const response = await chai
        .request(app)
        .post('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`)
        .send(mockData.createLoan.conflictLoan);

      expect(response.status).to.equal(409);
      expect(response.body).to.have.property('error');
    });
  });

  describe('Get all loans', () => {
    it('Admin should be able to get all loans', async () => {
      const loginResponse = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.adminLogin);

      adminToken = loginResponse.body.data.token;

      const response = await chai
        .request(app)
        .get('/api/v1/loans')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('User should not be able to view loan applications', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });

    it('Should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans')
        .set('Authorization', 'Bearer WrongToken');

      expect(response.status).to.equal(401);
    });

    it('Should return an authentication error when authorization headers are not present', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans');

      expect(response.status).to.equal(401);
    });
  });

  describe('Current loans', () => {
    it('It should return all current loans', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans?status=approved&repaid=false')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('It should return a 400 error when wrong status value is provided', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans?status=wrong&repaid=false')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Invalid status');
    });

    it('It should return a 400 error when wrong repaid value is provided', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans?status=approved&repaid=wrong')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Repaid value should be a boolean');
    });
  });

  describe('Repaid loans', () => {
    it('It should return all repaid loans', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans?status=approved&repaid=true')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('It should return a 400 error when wrong status value is provided', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/loans?status=wrong&repaid=true')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Invalid status');
    });
  });
});
