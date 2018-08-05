import { ChildProcess, spawn } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

import rimraf = require('rimraf');

import { exitCode, packageRoot, stdoutData } from './test-utils';

const execPath = join(packageRoot, 'dist/npm-prologue.js');

describe('npm-prolgue', () => {
  let npmPrologue: ChildProcess;

  afterEach(async () => {
    npmPrologue.kill();
    await promisify(rimraf)(join(__dirname, '__temp__/*'));
  });

  it('should be able to run with normally', async () => {
    npmPrologue = spawn(execPath, [], {
      stdio: 'pipe',
      cwd: join(__dirname, '/__temp__'),
    });
    const logo = await stdoutData(npmPrologue.stdout);
    expect(logo).toMatchSnapshot();

    const code = await exitCode(npmPrologue);
    expect(code).toBe(0);
  });
});
