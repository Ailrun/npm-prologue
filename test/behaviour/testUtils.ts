import { join, resolve } from 'path';

import * as memoryFsUtils from './testUtils/memoryFsUtils';
import * as processUtils from './testUtils/processUtils';

export const packageRoot = resolve(join(__dirname, '../../'));

export {
  memoryFsUtils,
  processUtils,
};
