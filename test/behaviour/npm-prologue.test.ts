import { ChildProcess } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import spawn from 'cross-spawn';

import rimraf = require('rimraf');

import { inquirerUtils, packageRoot, processUtils } from './testUtils';

let logoSnapshot: string | undefined;

describe('npm-prologue', () => {
  const cwd = join(__dirname, '/__temp__');
  const execPath = join(packageRoot, 'dist/npm-prologue.js');
  const spawnNpmPrologue = (...args: string[]) => {
    npmPrologue = spawn(execPath, args, {
      stdio: 'pipe',
      cwd,
    });
  };
  let npmPrologue: ChildProcess;

  afterEach(async () => {
    npmPrologue.kill();
    await promisify(rimraf)(join(__dirname, '__temp__/*'));
  });

  it('should display a fixed logo', async () => {
    spawnNpmPrologue();

    const logo = await processUtils.read(npmPrologue.stdout);
    logoSnapshot = logo;
    expect(logo).toMatchSnapshot('logo');
  });

  it('should display a help message when there is no arguments', async () => {
    spawnNpmPrologue();
    /**
     * @desc
     * `exitCode` promise should be created initially since it cannot detect
     * already finished process.
     * @todo
     * Make an utility for `spawn`ing a child process with a functionality to detect exit code.
     */
    const exitCodePromise = processUtils.exitCode(npmPrologue);

    const logo = await processUtils.read(npmPrologue.stdout);
    expect(logo).toMatch(logoSnapshot);

    const helpMessage = await processUtils.read(npmPrologue.stdout);
    expect(helpMessage).toBe([
      '',
      '  Usage: npm-prologue <directory-path> [options]',
      '',
      '  Options:',
      '',
      '    -h, --help  output usage information',
      '',
      '  Examples:',
      '',
      '    $ npm-prologue --help',
      '    $ npm-prologue my-new-awesome-package',
      '',
    ].join('\n'));

    const code = await exitCodePromise;
    expect(code).toBe(1);
  }, 1000);

  it('should be able to run normally with an argument which is the name for new directory', async () => {
    spawnNpmPrologue('test-package');
    const exitCodePromise = processUtils.exitCode(npmPrologue);

    const logo = await processUtils.read(npmPrologue.stdout);
    expect(logo).toMatch(logoSnapshot);

    await inquirerUtils.giveInputs(npmPrologue, [
      // Making name
      inquirerUtils.ENTER,
      // Making version
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
      // Making keywords
      inquirerUtils.ENTER,
      // Making license
      inquirerUtils.ENTER,
      // Making author
      inquirerUtils.ENTER,
      // Making main
      inquirerUtils.ENTER,
      // Making repository.type
      inquirerUtils.ENTER,
      // Making repository.url
      'https://somewhere.com',
      inquirerUtils.ENTER,
    ]);

    const code = await exitCodePromise;
    expect(code).toBe(0);

    expect(readFileSync(join(cwd, 'test-package', 'package.json'), 'utf-8')).toBe([
      '{',
      '  "name": "test-package",',
      '  "version": "0.0.1",',
      '  "keywords": [],',
      '  "license": "MIT",',
      '  "main": "index.js",',
      '  "repository": {',
      '    "type": "git",',
      '    "url": "https://somewhere.com"',
      '  }',
      '}',
      '',
    ].join('\n'));
  });

  it('should run normally with path with more than one segments', async () => {
    spawnNpmPrologue('project/test-package');
    const exitCodePromise = processUtils.exitCode(npmPrologue);

    const logo = await processUtils.read(npmPrologue.stdout);
    expect(logo).toBe(logoSnapshot);

    await inquirerUtils.giveInputs(npmPrologue, [
      // Making name
      inquirerUtils.ENTER,
      // Making version
      inquirerUtils.DOWN,
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
      // Making keywords
      'ABC, DEF',
      inquirerUtils.ENTER,
      // Making license
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
      // Making author
      'Junyoung Park <where@are.you>',
      inquirerUtils.ENTER,
      // Making main
      'some.ts',
      inquirerUtils.ENTER,
      // Making repository.type
      inquirerUtils.ENTER,
      // Making repository.url
      'https://my.repo.com',
      inquirerUtils.ENTER,
    ]);

    const code = await exitCodePromise;
    expect(code).toBe(0);

    expect(readFileSync(join(cwd, 'project', 'test-package', 'package.json'), 'utf-8')).toBe([
      '{',
      '  "name": "test-package",',
      '  "version": "0.1.0",',
      '  "keywords": [',
      '    "ABC",',
      '    "DEF"',
      '  ],',
      '  "license": "BSD-4-Clause",',
      '  "author": {',
      '    "name": "Junyoung Park",',
      '    "email": "where@are.you"',
      '  },',
      '  "main": "some.ts",',
      '  "repository": {',
      '    "type": "git",',
      '    "url": "https://my.repo.com"',
      '  }',
      '}',
      '',
    ].join('\n'));
  });
});
