/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  modulePaths: ['<rootDir>/'],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
};
