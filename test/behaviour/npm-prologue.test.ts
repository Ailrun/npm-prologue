import { spawn } from 'child_process';
import { join } from 'path';

import { packageRoot } from './test-utils';

const execPath = join(packageRoot, 'dist/npm-prologue.js');

describe('npm-prolgue', () => {
  it('should be able to run with normally', async () => {
    const npmPrologue = spawn(execPath, [], { stdio: 'pipe' });
    const logo = await new Promise<Buffer>((resolve) => npmPrologue.stdout.once('data', resolve));
    expect(logo).toMatchSnapshot();
    const code = await new Promise<number>((resolve) => npmPrologue.once('exit', resolve));
    expect(code).toBe(0);
  });
});
