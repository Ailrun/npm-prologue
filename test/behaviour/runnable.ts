import { main } from '$/bin';

describe('main', () => {
  it('should be runnable', () => {
    expect(() => {
      main();
    }).not.toThrowError();
  });
});
