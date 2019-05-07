import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mock';

const { expect } = chai;
chai.use(chaiHttp);

describe('User', () => {
  describe('Signup User', () => {
    it('User should be able to create an account', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.validNewUser);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('data');
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.have.keys(['token', 'id', 'firstName', 'lastName', 'password', 'email']);
    });

    it('It should return a conflict error when account already exists', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.duplicateEmail);

      expect(response.status).to.equal(409);
    });

    it('It should return a 400 error when firstName is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingFirstName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when lastName is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingLastName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when email is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingEmail);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when address is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingAddress);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when passwword is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingPassword);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return 400 if firstName contains a character not an alphabet', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.unsupportedFirstName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return 400 if lastName contains a character not an alphabet', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.missingLastName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when address format is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.unsupportedAddresFormat);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when email format is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.invalidEmail);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when address length is less than 10 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.shortAddress);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error address length is greater than 255 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.longAddress);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when firstName is less than 2 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.shortFirstName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when firstName has more than 50 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.longFirstName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when lastName is less than 2 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.shortlastName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when lastName has more than 50 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.longLastName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when password is less than 6 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.shortlastName);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('It should return a 400 error when password has more than 100 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.signUp.longPassword);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });

  describe('Login User', () => {
    it('Invalid user email should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.wrongEmailFormat);

      expect(response.status).to.equal(400);
    });

    it('Non-existing account should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.nonExistingLogin);

      expect(response.status).to.equal(400);
    });

    it('Missing password should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.missingPassword);
      expect(response.status).to.equal(400);
    });

    it('Missing email should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.wrongPassword);
      expect(response.status).to.equal(400);
    });

    it('Wrong password should return 400 error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.wrongPassword);
      expect(response.status).to.equal(400);
    });

    it('Admin should be able to login ', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.adminLogin);

      expect(response.status).to.equal(200);
      expect(response.body.data.token).to.be.a('string');
    });

    it('User should be able to login ', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.userLogin);

      expect(response.status).to.equal(200);
      expect(response.body.data.token).to.be.a('string');
    });
  });
});
