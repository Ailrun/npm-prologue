import { Question } from 'inquirer';

export interface NpmResponses {
  npm: {
    name: string,
    version: '0.0.0' | '0.0.1' | '0.1.0' | '1.0.0',
  };
}

export const npmPrompts: ReadonlyArray<Question<NpmResponses>> = [
  {
    type: 'input',
    name: 'npm.name',
    message: 'What is the name of your awesome package?',
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
];
