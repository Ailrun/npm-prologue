import { ChildProcess } from 'child_process';
import { Readable, Writable } from 'stream';

export const read = (stream: Readable) => {
  return new Promise<Buffer>((resolve) => {
    stream.once('data', resolve);
  })
    .then((buf) => buf.toString('utf-8'));
};

export const readTrimed = (stream: Readable) => {
  return new Promise<Buffer>((resolve) => {
    stream.once('data', resolve);
  })
    .then((buf) => buf.toString('utf-8'))
    .then((rawStr) => rawStr.trim());
};

export const write = (stream: Writable, str: string) => {
  return new Promise<void>((resolve) => {
    stream.write(str, resolve);
  });
};

export const writeLn = (stream: Writable, str: string = '') => {
  return write(stream, str + '\n');
};

export const exitCode = (process: ChildProcess) => {
  return new Promise<number>((resolve) => process.once('exit', resolve));
}
