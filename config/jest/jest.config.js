module.exports = {
  errorOnDeprecated: true,
  globals: {
    'ts-jest': {
      tsConfig: './config/tsconfig/tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '\\$/(.*)': '<rootDir>/src/$1',
  },
  rootDir: '../../',
  testMatch: [
    '<rootDir>/test/behaviour/**/*.test.ts',
  ],
  preset: 'ts-jest',
};
