import { createPackageJson } from '../lib';

import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  createPackageJson({
    type: 'javascript',
    npm: {
      name: '',
      version: '',
    },
  });
};
