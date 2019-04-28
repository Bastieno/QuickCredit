import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const url = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';

chai.use(chaiHttp);

// Test for signup route
describe('User SignUp Tests', () => {
  describe(`POST ${url}`, () => {
    it('Should create a new user account', (done) => {
      const user = {
        email: 'amarachi@gmail.com',
        firstName: 'Amara',
        lastName: 'Okoye',
        password: 'mara23',
        address: 'Km 18 Airport Road, Galadimawa, Abuja',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          res.body.data.should.have.property('address');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });

    it('Should return 400 if firstName is missing', (done) => {
      const user = {
        lastName: 'Nduamaka',
        password: 'chisom15',
        email: 'fnduamaka@gmail.com',
        address: 'Km 10 Airport Road, Galadimawa, Abuja',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return 400 if email is missing', (done) => {
      const user = {
        firstName: 'Francis',
        lastName: 'Nduamaka',
        password: 'chisom15',
        address: 'Km 10 Airport Road, Galadimawa, Abuja',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should return 400 if lastName is missing', (done) => {
      const user = {
        firstName: 'Francis',
        password: 'chisom15',
        email: 'fnduamaka@gmail.com',
        address: 'Km 10 Airport Road, Galadimawa, Abuja',
      };
      chai
        .request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

describe(`POST ${url}`, () => {
  it('Should return 400 if address is missing', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should return 400 if password is missing', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should return 400 if firstName contains a character that is not an alphabet', (done) => {
    const user = {
      firstName: '258vdvhkashka',
      lastName: 'Francis',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should return 400 if lastName contains a character that is not an alphabet', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: '65488+vvs',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return 400 email is invalid', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@yahoo',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return 400 if address format is invalid', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: '@ area 10 & Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe(`POST ${url}`, () => {
  it('Should return 400 if address length is less than 10 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Anambra',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return 400 if address length is greater than 255 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: new Array(257).join('a'),
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if firstName is less than 2 characters', (done) => {
    const user = {
      firstName: 'F',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if firstName has more than 50 characters', (done) => {
    const user = {
      firstName: new Array(52).join('a'),
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if lastName is less than 2 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'N',
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if lastName has more than 50 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: new Array(52).join('a'),
      email: 'fnduamaka@gmail.com',
      password: 'chisom15',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if password has less than 6 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamak@gmail.com',
      password: '11111',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 400 if password has more than 255 characters', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamak@gmail.com',
      password: new Array(257).join('a'),
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should return status 409 if Email Address already exist', (done) => {
    const user = {
      firstName: 'Francis',
      lastName: 'Nduamaka',
      email: 'fnduamaka@gmail.com',
      password: 'maths102',
      address: 'Km 10 Airport Road, Galadimawa, Abuja',
    };
    chai
      .request(app)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});

// Test for login route
describe('User Login Tests', () => {
  describe(`POST ${loginUrl}`, () => {
    it('Should successfully login a user account', (done) => {
      const user = {
        email: 'fnduamaka@gmail.com',
        password: 'chisom15',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });
    it('Should return 400 and deny access if email is invalid', (done) => {
      const user = {
        email: 'amaka@gmail.com',
        password: 'ogochukwu24',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid Email or Password');
          done();
        });
    });
    it('Should return 400 and deny access if password is invalid', (done) => {
      const user = {
        email: 'fnduamaka@gmail.com',
        password: 'chisom14',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid Email or Password');
          done();
        });
    });
    it('Should return 400 if email is not entered', (done) => {
      const user = {
        password: 'chisom15',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email is required');
          done();
        });
    });
    it('Should return 400 if password is not entered', (done) => {
      const user = {
        email: 'fnduamaka@gmail.com',
      };
      chai
        .request(app)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Password is required');
          done();
        });
    });
  });
});
