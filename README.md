# QuickCredit

### Build Status

[![Build Status](https://travis-ci.org/Bastieno/QuickCredit.svg?branch=develop)](https://travis-ci.org/Bastieno/QuickCredit)
[![Coverage Status](https://coveralls.io/repos/github/Bastieno/QuickCredit/badge.svg)](https://coveralls.io/github/Bastieno/QuickCredit)
[![Test Coverage](https://api.codeclimate.com/v1/badges/73452eded9e81dae9728/test_coverage)](https://codeclimate.com/github/Bastieno/QuickCredit/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/73452eded9e81dae9728/maintainability)](https://codeclimate.com/github/Bastieno/QuickCredit/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)


Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## App Link

> [Quick Credit UI Templates]( https://bastieno.github.io/QuickCredit/UI)

> The app is currently hosted on Heroku. Visit [QuickCredit]( https://baz-quick-credit.herokuapp.com/) now!

## Required Features

- Users can sign up
- Users can login
- User can apply for loan
- User can view loan repayment history
- Admin can mark user as verified
- Admin can view all loan applications
- Admin can view a specific loan application
- Admin can view current loans (not fully repaid)
- Admin can view all repaid loans
- Admin can approve or reject a client's loan application
- Admin can post loan repayment transaction in favour of client

## Extra Features

- Admin can delete users
- Admin can view details of all users
- Admin can view details of a specific user
- User can reset password

## Project Management

Project is managed [here](https://www.pivotaltracker.com/n/projects/2328087) using the project management tool, [Pivotal Tracker](https://www.pivotaltracker.com).

## Templates

UI templates are hosted on Github pages [here](https://bastieno.github.io/QuickCredit/UI)

## Technologies Used

- [Node.js](https://nodejs.org) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
- [Express.js](https://expressjs.com) - Web framework based on Node.js.
- [PostgreSQL](https://www.postgresql.org) - An Object relational database.
- [Babel](https://babeljs.io) - Javascript transpiler.
- [Eslint](https://eslint.org/) - Javascript linter.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.

### Testing tools

- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com) - Assertion library.
- [nyc](https://github.com/istanbuljs/nyc) - Istanbul's command line interface.


### Testing the application

Requirements

- [Postman](https://www.getpostman.com/) - API development and testing environment.

Testing with Postman

- Install Postman by following the link above.
- Navigate to `localhost:3000` in Postman to access the application.
- Use the API Documentation to access the endpoints available.

Running unit tests.

- In an open terminal, navigate to the cloned project file.
- Run `npm test`. This runs tests and displays coverage data generated by [Istanbul's](https://istanbul.js.org) nyc.

# Working Routes

## API Endpoints

| Endpoint                                     |              Functionality               | HTTP method |
| -------------------------------------------- | :--------------------------------------: | ----------: |
| /api/v1/auth/signup                          |          Create a user account           |        POST |
| /api/v1/auth/login                           |               Login a user               |        POST |
| /api/v1/loans                                |        Create a loan application         |        POST |
| /api/v1/loans                                |        Get all loan applications         |         GET |
| /api/v1/loans/_loan_id_                      |     Get a specific loan application      |         GET |
| /api/v1/_loan_id_/repayments                 |     View all loan repayment History      |         GET |
| /api/v1/_user_email_/verify                  |          Mark user as Verified           |       PATCH |
| /api/v1/loans?_status=approved&repaid=false_ | View all current loans(not fully repaid) |         GET |
| /api/v1/loans?_status=approved&repaid=true_  |      View all current repaid loans       |         GET |
| /api/v1/loan/_loan_id_                       |          Reject or approve loan          |       PATCH |
| /api/v1/_loan_id_/repayment                  |        Create a repayment record         |        POST |
| /api/v1/users/password                       |              Reset password              |        POST |
| /api/v1/users/                               |              Get all users               |         GET |
| /api/v1/users/_user_email_                   |            Get a single user             |         GET |
| /api/v1/users/_user_email_/delete            |            Delete a user account         |      DELETE |


## Authors

 Nduamaka Francis  ⚡️