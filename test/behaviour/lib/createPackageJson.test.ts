import fs from 'fs';
import path from 'path';

import { createPackageJson, createPackageJsonOptions } from '$/lib/createPackageJson';

import { resetMemoryFs } from '../test-utils';

jest.mock('fs', () => new (require('memory-fs'))());

const testOptions0: createPackageJsonOptions = {
  type: 'javascript',
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
  type: 'typescript',
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
  type: 'typescript',
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
    resetMemoryFs(fs as any);
  });

  it('should be able to execute normally with various options', async () => {
    await expect(createPackageJson({
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);

    await expect(createPackageJson({
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);

    await expect(createPackageJson({
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);

    await expect(createPackageJson({
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);

    await expect(createPackageJson({
      directory: './',
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);

    await expect(createPackageJson({
      directory: '../',
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: ''
      },
    })).resolves.not.toThrowError();
    resetMemoryFs(fs as any);
  });

  it('should write package.json file to appropriate path', async () => {
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      directory: './',
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('../package.json'))).toBe(false);
    await createPackageJson({
      directory: '../',
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('../package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('test-package/package.json'))).toBe(false);
    await createPackageJson({
      directory: 'test-package',
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('test-package/package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('some-dir/test-package/package.json'))).toBe(false);
    await createPackageJson({
      directory: 'some-dir/test-package',
      type: 'javascript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('some-dir/test-package/package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      directory: '.',
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('/package.json'))).toBe(false);
    await createPackageJson({
      directory: '/',
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
      },
    });
    expect(fs.existsSync(path.resolve('/package.json'))).toBe(true);
    resetMemoryFs(fs as any);

    expect(fs.existsSync(path.resolve('./package.json'))).toBe(false);
    await createPackageJson({
      type: 'typescript',
      npm: {
        name: 'test-package',
        version: '0.0.0',
        description: 'This is test package',
      },
    });
    expect(fs.existsSync(path.resolve('./package.json'))).toBe(true);
    resetMemoryFs(fs as any);
  });

  it('should write package.json with well-ordered contents', async () => {
    await createPackageJson(testOptions0);
    expect(fs.readFileSync(path.resolve('./package.json'), 'UTF-8').trim()).toBe(testPackageJson0);
    resetMemoryFs(fs as any);

    await createPackageJson(testOptions1);
    expect(fs.readFileSync(path.resolve('./package.json'), 'UTF-8').trim()).toBe(testPackageJson1);
    resetMemoryFs(fs as any);

    await createPackageJson(testOptions2);
    expect(fs.readFileSync(path.resolve('../../my_hidden_package/package.json'), 'UTF-8').trim()).toBe(testPackageJson2);
    resetMemoryFs(fs as any);
  });
});
