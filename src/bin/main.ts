import inquirer from 'inquirer';

import { createPackageJson } from '../lib';

import { npmPrompts } from './npmPrompts';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  const responses = await inquirer.prompt([
    ...npmPrompts,
  ]);

  createPackageJson({
    npm: responses.npm,
  });
};
