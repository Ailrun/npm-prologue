import { expect } from 'chai';

import { main } from '../../src/bin';

describe('main', () => {
  it('should be runnable', () => {
    expect(() => {
      main();
    }).not.to.throw();
  });
});
