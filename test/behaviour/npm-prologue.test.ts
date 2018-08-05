import { ChildProcess, spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import rimraf = require('rimraf');

import { inquirerUtils, packageRoot, processUtils } from './testUtils';

describe('npm-prolgue', () => {
  const cwd = join(__dirname, '/__temp__');
  const execPath = join(packageRoot, 'dist/npm-prologue.js');
  let npmPrologue: ChildProcess;

  beforeEach(() => {
    npmPrologue = spawn(execPath, [], {
      stdio: 'pipe',
      cwd,
    });
  });

  afterEach(async () => {
    npmPrologue.kill();
    await promisify(rimraf)(join(__dirname, '__temp__/*'));
  });

  it('should be able to run normally', async () => {
    /**
     * @desc
     * `exitCode` promise should be created initially since it cannot detect
     * already finished process.
     * @todo
     * Make an utility for `spawn`ing a child process with a functionality to detect exit code.
     */
    const exitCodePromise = processUtils.exitCode(npmPrologue);

    const logo = await processUtils.read(npmPrologue.stdout);
    expect(logo).toMatchSnapshot('logo');

    await inquirerUtils.giveInputs(npmPrologue, [
      'test-package',
      inquirerUtils.ENTER,
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
    ]);

    const code = await exitCodePromise;
    expect(code).toBe(0);

    expect(readFileSync(join(cwd, 'package.json'), 'utf-8').trim()).toBe([
      '{',
      '  "name": "test-package",',
      '  "version": "0.0.1"',
      '}',
    ].join('\n').trim());
  });
});
