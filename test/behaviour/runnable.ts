import { main } from '$/bin';

describe('main', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be runnable', () => {
    jest.spyOn(console, 'log')
      .mockImplementation(() => {});

    return expect(main()).resolves
      .not.toThrowError();
  });
});
