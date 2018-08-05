import fs from 'fs';
import path from 'path';

import { createPackageJson, createPackageJsonOptions } from '$/lib/createPackageJson';

import { memoryFsUtils } from '../testUtils';

jest.mock('fs', () => new (require('memory-fs'))());

const testOptions0: createPackageJsonOptions = {
  npm: {
    name: 'testable-package-name',
    version: '0.0.0',
  },
};
const testPackageJson0 = `
{
  "name": "testable-package-name",
  "version": "0.0.0"
}
`.trim();

const testOptions1: createPackageJsonOptions = {
  indent: 4,
  npm: {
    name: 'my-package-test',
    version: '1.0.0',
    description: 'This is my new package!',
  },
};
const testPackageJson1 = `
{
    "name": "my-package-test",
    "version": "1.0.0",
    "description": "This is my new package!"
}
`.trim();

const testOptions2: createPackageJsonOptions = {
  directory: '../../my_hidden_package',
  npm: {
    description: 'Shhhh... this is secret package',
    version: '1.0.0',
    name: 'package-my-hidden',
  },
};
const testPackageJson2 = `
{
  "name": "package-my-hidden",
  "version": "1.0.0",
  "description": "Shhhh... this is secret package"
}
`.trim();

describe('createProject', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    memoryFsUtils.reset(fs as any);
  });

  it('should be able to execute normally with various options', async () => {
    await expect(createPackageJson({
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);

    await expect(createPackageJson({
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);

    await expect(createPackageJson({
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);

    await expect(createPackageJson({
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);

    await expect(createPackageJson({
      directory: './',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);

    await expect(createPackageJson({
      directory: '../',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    memoryFsUtils.reset(fs as any);
  });

  it('should write package.json file to appropriate path', async () => {
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      directory: './',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('../package.json'))).toBe(false);
    await createPackageJson({
      directory: '../',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('../package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('test-package/package.json'))).toBe(false);
    await createPackageJson({
      directory: 'test-package',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('test-package/package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('some-dir/test-package/package.json'))).toBe(false);
    await createPackageJson({
      directory: 'some-dir/test-package',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('some-dir/test-package/package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      directory: '.',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('/package.json'))).toBe(false);
    await createPackageJson({
      directory: '/',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('/package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);

    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: 'This is test package',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    memoryFsUtils.reset(fs as any);
  });

  it('should write package.json with well-ordered contents', async () => {
    await createPackageJson(testOptions0);
    expect(fs.readFileSync(path.resolve('./package.json'), 'UTF-8').trim()).toBe(testPackageJson0);
    memoryFsUtils.reset(fs as any);

    await createPackageJson(testOptions1);
    expect(fs.readFileSync(path.resolve('./package.json'), 'UTF-8').trim()).toBe(testPackageJson1);
    memoryFsUtils.reset(fs as any);

    await createPackageJson(testOptions2);
    expect(fs.readFileSync(path.resolve('../../my_hidden_package/package.json'), 'UTF-8').trim()).toBe(testPackageJson2);
    memoryFsUtils.reset(fs as any);
  });
});
