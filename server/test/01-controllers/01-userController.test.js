import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../mock';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
let adminToken;

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
      expect(response.body.data).to.have.keys(['token', 'userId', 'firstName', 'lastName', 'email', 'password']);
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
      adminToken = response.body.data.token;
    });

    it('User should be able to login ', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(mockData.login.userLogin);

      expect(response.status).to.equal(200);
      expect(response.body.data.token).to.be.a('string');
      userToken = response.body.data.token;
    });

    it('It should login a user with valid token', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.status).to.equal(200);
    });

    it('It should return 404 error if token is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Authorization', 'Bearer wrongToken');
      expect(response.status).to.equal(401);
    });
  });

  describe('Get All User', () => {
    it('User should not be able to retrieve all users', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });

    it('Admin should be able to retrieve all users', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('Should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/')
        .set('Authorization', 'Bearer WrongToken');

      expect(response.status).to.equal(401);
    });

    it('Should return an authorization error when authorization header is not set', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/');

      expect(response.status).to.equal(401);
    });
  });

  describe('Get Single User', () => {
    it('It should return a 404 error for a non-existing user email', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/hammed@gmail.com')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(404);
    });

    it('Admin should be able to retrieve a single user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/chisom@gmail.com')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('A user cannot get another user account', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/4')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });
  });

  describe('Verify User', () => {
    it('It should return a 404 error when trying to verify a non-existing account', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/adams@gmail.com/verify')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(404);
    });

    it('Only admin should be able to verify an account', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/amara@gmail.com/verify')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('A user cannot verify an account', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/gwinters@gmail.com/verify')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });
  });

  describe('Update User Role', () => {
    it('It should return a 404 error when trying to update a non-existing account', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/adams@gmail.com/update_role')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(404);
    });

    it('Only admin should be able to change a user role', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/amara@gmail.com/update_role')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('A user cannot change another user role', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/users/gwinters@gmail.com/update_role')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });
  });


  describe('Delete User', () => {
    it('It should return a 404 error when trying to delete a non-existing account', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/users/jsnow@fakemail.com/delete')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(404);
    });

    it('Should return an authorization error when an invalid token is passed', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/users/gwinters@gmail.com/delete')
        .set('Authorization', 'Bearer WrongToken');

      expect(response.status).to.equal(401);
    });

    it('Admin should be able to delete other accounts', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/users/gwinters@gmail.com/delete')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).to.equal(200);
    });

    it('A user cannot delete other accounts', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/users/gwinters@gmail.com/delete')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).to.equal(403);
    });
  });

  describe('Reset Password', () => {
    it('User should be able to reset password', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/cynthia@gmail.com/reset_password');
      expect(response.status).to.equal(200);
    });

    it('It should return 404 for non-existing accounts', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/dalu@gmail.com/reset_password')
        .send(mockData.resetPassword.unregisteredUser);

      expect(response.status).to.equal(404);
    });

    it('It should return 400 if email is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/amara@gmail.com/reset_password')
        .send(mockData.resetPassword.invalidEmail);

      expect(response.status).to.equal(400);
    });

    it('It should return 400 if password is less than 6 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/amara@gmail.com/reset_password')
        .send(mockData.resetPassword.shortPassword);

      expect(response.status).to.equal(400);
    });

    it('It should return a 400 error when password has more than 100 characters', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/users/amara@gmail.com/reset_password')
        .send(mockData.resetPassword.longPassword);

      expect(response.status).to.equal(400);
    });
  });
});
