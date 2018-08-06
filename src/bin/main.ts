import process from 'process';

import inquirer from 'inquirer';
import commander from 'commander';

import { createPackageJson } from '../lib';

import { npmPrompts } from './npmPrompts';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  commander
    .usage('<directory-name> [options]')

  commander
    .arguments('<directory-name>')
    .action((directoryName) => {
      commander.directoryName = directoryName;
    });

  commander.parse(process.argv);

  if (commander.directoryName === undefined) {
    commander.outputHelp((help) => {
      return help + ([
        '  Examples:',
        '',
        `    $ ${commander.name()} --help`,
        `    $ ${commander.name()} my-new-awesome-package`,
      ].join('\n'));
    });
    process.exit(1);
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
