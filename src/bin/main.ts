/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import commander from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import process from 'process';

import { createPackageJson } from '../lib';

import { npmPrompts } from './npmPrompts';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  commander
    .usage('<directory-path> [options]');

  let directoryPath: string | undefined;
  commander
    .arguments('[directory-path]')
    .action((_directoryPath: string) => {
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
        '',
      ].join('\n'));
    });
    process.exit(1);
  }

  const packageName = path.basename(directoryPath);
  const responses = await inquirer.prompt([
    ...npmPrompts(packageName),
  ]);

  await createPackageJson({
    directory: directoryPath,
    npm: responses.npm,
  });
};
