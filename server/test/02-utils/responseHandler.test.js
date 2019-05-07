import { expect } from 'chai';
import responseHandler from '../../utils/responseHandler';

describe('Response Handler Utility Function', () => {
  it('The utility file should export a function', (done) => {
    expect(responseHandler).to.be.a('function');
    done();
  });
});
