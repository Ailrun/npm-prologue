/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import fs from 'fs';
import path from 'path';
import util from 'util';

import mkdirp from 'mkdirp';

import { PackageJson } from '../types';

import { serializePackageJson } from './serializePackageJson';
import { tightenPackageJson } from './tightenPackageJson';

export interface createPackageJsonOptions {
  readonly directory?: string;
  readonly indent?: number | string;
  readonly npm: PackageJson.Normalized;
  [key: string]: any;
}

export const createPackageJson = async (
  options: createPackageJsonOptions,
) => {
  const {
    directory = '.',
    indent = 2,
  } = options;
  const directoryPath = path.resolve(directory);
  await util.promisify(mkdirp)(directoryPath);
  const packageJsonPath = path.join(directoryPath, 'package.json');
  const packageJsonContent = tightenPackageJson({
    ...options.npm,
  });

  return util.promisify(fs.writeFile.bind(fs))(
    packageJsonPath,
    serializePackageJson(packageJsonContent, indent) + '\n',
    'utf-8',
  );
};
