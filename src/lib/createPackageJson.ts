import fs from 'fs';
import path from 'path';
import util from 'util';

import mkdirp from 'mkdirp';

import { PackageJson } from '../types';

export interface createPackageJsonOptions {
  readonly type: 'javascript' | 'typescript';
  readonly directory?: string;
  readonly indent?: number | string;
  readonly npm: PackageJson;
  [key: string]: any;
}

export const createPackageJson = async (options: createPackageJsonOptions) => {
  const {
    directory = '.',
    indent = 2,
  } = options;
  const directoryPath = path.resolve(directory);
  await util.promisify(mkdirp)(directoryPath);
  const packageJsonPath = path.join(directoryPath, 'package.json');
  const packageJsonContent = {
    ...options.npm,
  };

  return util.promisify(fs.writeFile.bind(fs))(packageJsonPath, JSON.stringify(packageJsonContent, undefined, indent), 'utf-8');
};
