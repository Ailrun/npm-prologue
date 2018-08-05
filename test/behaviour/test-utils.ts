import { ChildProcess } from 'child_process';
import { join, resolve } from 'path';
import { Readable, Writable } from 'stream';

export const packageRoot = resolve(join(__dirname, '../../'));

export const resetMemoryFs: (
  fs: import('memory-fs'),
) => void = (
  fs,
) => {
  for (let path of fs.readdirSync('/')) {
    path = join('/', path);
    const stat = fs.statSync(path);

    if (stat.isFile()) {
      fs.unlinkSync(path);
    } else {
      fs.rmdirSync(path);
    }
  }
};

export const stdoutData = (stdout: Readable) => {
  return new Promise<Buffer>((resolve) => {
    stdout.once('data', resolve);
  })
    .then((buf) => buf.toString('utf-8'));
};

export const stdinWrite = (stdin: Writable, str: string) => {
  return new Promise<void>((resolve) => {
    stdin.write(str, resolve);
  });
};

export const stdinWriteLn = (stdin: Writable, str: string) => {
  return stdinWrite(stdin, str + '\n');
};

export const exitCode = (process: ChildProcess) => {
  return new Promise<number>((resolve) => process.once('exit', resolve));
}
