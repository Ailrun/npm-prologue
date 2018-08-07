import process from 'process';

import inquirer from 'inquirer';
import commander from 'commander';

import { createPackageJson } from '../lib';

import { npmPrompts } from './npmPrompts';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  commander
    .usage('<directory-path> [options]')

  let directoryPath: string | undefined;
  commander
    .arguments('<directory-path>')
    .action((_directoryPath) => {
      directoryPath = _directoryPath;
    });

  commander.parse(process.argv);

  if (directoryPath === undefined) {
    commander.outputHelp((help) => {
      return help + ([
        '  Examples:',
        '',
        `    $ ${commander.name()} --help`,
        `    $ ${commander.name()} my-new-awesome-package`,
      ].join('\n'));
    });
    process.exit(1);
    return;
  }

  const responses = await inquirer.prompt([
    ...npmPrompts(directoryPath),
  ]);

  createPackageJson({
    directory: directoryPath,
    npm: responses.npm,
  });
};
