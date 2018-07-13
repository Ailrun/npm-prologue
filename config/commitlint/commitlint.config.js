module.exports = {
  rules: {
    'body-leading-blank': [
      2,
      'always',
    ],
    'footer-leading-blank': [
      2,
      'always',
    ],
    'header-max-length': [
      2,
      'always',
      72,
    ],
    'scope-enum': [
      2,
      'always',
      [
        'repo',
        'package',
        'cli',
      ],
    ],
    'scope-empty': [
      2,
      'never',
    ],
    'scope-case': [
      0,
    ],
    'subject-case': [
      2,
      'always',
      'lowerCase',
    ],
    'subject-empty': [
      0,
    ],
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'docs',
        'feat',
        'fix',
        'init',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-case': [
      0,
    ],
    'type-empty': [
      2,
      'never',
    ],
  },
};
