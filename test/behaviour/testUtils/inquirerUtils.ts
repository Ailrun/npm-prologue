import { ChildProcess } from 'child_process';
import R from 'ramda';

import { write } from './processUtils';

const wait = async (time: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, time);
});

const ESC = '\u001B';

export const ENTER = '\n';
export const DOWN = ESC + '[B';
export const UP = ESC + '[A';

export const pressKeys = async (process: ChildProcess, ...keys: (string | string[])[]) => {
  for (const key of R.chain((key) => Array.isArray(key) ? key : [key], keys)) {
    await pressKey(process, key);
  }
};
export const giveInputs = pressKeys;

export const pressEnter = async (process: ChildProcess) => {
  return pressKey(process, ENTER);
};
export const pressDown = async (process: ChildProcess) => {
  return pressKey(process, DOWN);
};
export const pressUp = async (process: ChildProcess) => {
  return pressKey(process, UP);
};

export const pressKey = async (process: ChildProcess, key: string) => {
  await write(process.stdin, key);
  await wait(100);
};
export const giveInput = pressKey;
