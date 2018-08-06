import { ChildProcess, spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import rimraf = require('rimraf');

import { inquirerUtils, packageRoot, processUtils } from './testUtils';

describe('npm-prolgue', () => {
  const cwd = join(__dirname, '/__temp__');
  const execPath = join(packageRoot, 'dist/npm-prologue.js');
  let spawnNpmPrologue = (...args: string[]) => {
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

  it('should be able to run normally with an argument which is the name for new directory', async () => {
    spawnNpmPrologue('test-package');
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
      inquirerUtils.ENTER,
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
    ]);

    const code = await exitCodePromise;
    expect(code).toBe(0);

    expect(readFileSync(join(cwd, 'test-package', 'package.json'), 'utf-8').trim()).toBe([
      '{',
      '  "name": "test-package",',
      '  "version": "0.0.1"',
      '}',
    ].join('\n').trim());
  });
});
