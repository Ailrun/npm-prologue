import process from 'process';

import inquirer from 'inquirer';
import commander from 'commander';

import { createPackageJson } from '../lib';

import { npmPrompts } from './npmPrompts';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  commander
    .arguments('<directory-name>')
    .action((directoryName) => {
      commander.directoryName = directoryName;
    });

  commander.parse(process.argv);

  if (commander.directoryName === undefined) {
    return;
  }

  const name = commander.directoryName;
  const responses = await inquirer.prompt([
    ...npmPrompts(name),
  ]);

  createPackageJson({
    directory: name,
    npm: responses.npm,
  });
};
