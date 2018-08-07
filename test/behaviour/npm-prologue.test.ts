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

    const helpMessage = await processUtils.readTrimed(npmPrologue.stdout);
    expect(helpMessage).toBe([
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
    ].join('\n').trim());

    const code = await exitCodePromise;
    expect(code).toBe(1);
  }, 1000);

  it('should be able to run normally with an argument which is the name for new directory', async () => {
    spawnNpmPrologue('test-package');
    const exitCodePromise = processUtils.exitCode(npmPrologue);

    const logo = await processUtils.read(npmPrologue.stdout);
    expect(logo).toMatch(logoSnapshot);

    await inquirerUtils.giveInputs(npmPrologue, [
      inquirerUtils.ENTER,
      inquirerUtils.DOWN,
      inquirerUtils.ENTER,
    ]);

    const code = await exitCodePromise;
    expect(code).toBe(0);

    expect(readFileSync(join(cwd, 'test-package', 'package.json'), 'utf-8')).toBe([
      '{',
      '  "name": "test-package",',
      '  "version": "0.0.1"',
      '}',
      '',
    ].join('\n'));
  });
});
