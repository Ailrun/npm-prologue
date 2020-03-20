import { ChildProcess } from 'child_process';
import { Readable, Writable } from 'stream';

export const read = async (stream: Readable) => {
  return new Promise<Buffer>((resolve) => {
    stream.once('data', resolve);
  })
    .then((buf) => buf.toString('utf-8'));
};

export const readTrimed = async (stream: Readable) => {
  return read(stream)
    .then((rawStr) => rawStr.trim());
};

export const write = async (stream: Writable, str: string) => {
  return new Promise<void>((resolve, reject) => {
    stream.write(str, (error) => {
      if (typeof error !== 'undefined') {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const writeLn = async (stream: Writable, str: string = '') => {
  return write(stream, str + '\n');
};

export const exitCode = async (process: ChildProcess) => {
  return new Promise<number>((resolve) => process.once('exit', resolve));
};
