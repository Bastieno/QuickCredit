import { expect } from 'chai';
import sinon from 'sinon';
import responseHandler from '../../utils/responseHandler';

describe('Response Handler Utility Function', () => {
  it('The utility file should export a function', (done) => {
    expect(responseHandler).to.be.a('function');
    done();
  });

  it('It should return an error', (done) => {
    const result = new Error();
    const res = {};
    const next = sinon.spy();
    const statusCode = 400;
    const message = 'Hi';
    responseHandler(result, next, res, statusCode, message);
    expect(next).to.have.been.calledOnce;
    done();
  });
});
