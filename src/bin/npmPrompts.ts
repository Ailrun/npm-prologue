/**
 * Copyright 2018-present Junyoung Clare Jang
 */
import { Question } from 'inquirer';

import { PackageJson } from '../types';

type NpmKeys =
  | 'name'
  | 'keywords'
  | 'license'
  | 'author'
  | 'main'
  | 'repository'
  ;
export interface NpmResponses {
  npm: Pick<PackageJson.WellKnown, NpmKeys> & {
    version: '0.0.0' | '0.0.1' | '0.1.0' | '1.0.0';
  };
}

export const npmPrompts = (
  name: string,
): ReadonlyArray<Question<NpmResponses>> => [
  {
    type: 'input',
    name: 'npm.name',
    message: 'What is the name of your awesome package?',
    default: name,
  },
  {
    type: 'list',
    name: 'npm.version',
    message: 'What is the initial version of your awesome package?',
    choices: [
      '0.0.0',
      '0.0.1',
      '0.1.0',
      '1.0.0',
    ],
    default: '0.0.0',
  },
  {
    type: 'input',
    name: 'npm.keywords',
    message: 'What are keywords for your awesome package?',
    filter(input) {
      return input
        .split(',')
        .map((keyword) => keyword.trim())
      /**
       * @desc
       * this `as any` is because of wrong typing of `inquirer`.
       */
        .filter((keyword) => keyword.length !== 0) as any;
    },
  },
  {
    type: 'list',
    name: 'npm.license',
    message: 'Which license do you want to use?',
    choices: [
      'MIT',
      'BSD-4-Clause',
      'BSD-3-Clause',
      'BSD-2-Clause',
      'Apache-2.0',
      'Apache-1.1',
      'Apache-1.0',
      'LGPL-3.0',
      'LGPL-2.1',
      'LGPL-2.0',
      'GPL-3.0',
      'GPL-2.0',
    ],
    default: 'MIT',
  },
  {
    type: 'input',
    name: 'npm.author',
    message: 'What is your identity (name <email> (url))?',
    filter(input) {
      /**
       * @todo
       * input should be validated with RegExp
       */
      return input === '' ? undefined : input;
    },
  },
  {
    type: 'input',
    name: 'npm.main',
    message: 'What is the entry file for your package?',
    default: 'index.js',
  },
  {
    type: 'list',
    name: 'npm.repository.type',
    message: 'What is your repository type?',
    choices: [
      'git',
      'svn',
      'nothing',
    ],
    default: 'git',
    filter(type) {
      if (type === 'nothing') {
        return undefined as any;
      } else {
        return type;
      }
    },
  },
  {
    type: 'input',
    name: 'npm.repository.url',
    message: 'What is the URL of your repository?',
    when({ npm }) {
      return (npm.repository as any).type !== undefined;
    },
  },
];
