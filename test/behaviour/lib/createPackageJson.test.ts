import fs from 'fs';
import path from 'path';

import { createPackageJson } from '$/lib/createPackageJson';

import { resetMemoryFs } from '../test-utils';

jest.mock('fs', () => new (require('memory-fs'))());

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
});
