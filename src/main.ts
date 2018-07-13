import { createProject } from './index';
import { printLogo } from './printLogo';

export const main = async () => {
  await printLogo();

  createProject();
};
