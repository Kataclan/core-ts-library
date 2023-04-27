module.exports = {
  testURL: 'http://localhost/',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['public', 'node_modules'],
  modulePaths: ['<rootDir>', '<rootDir>/src'],
  prettierPath: '<rootDir>/node_modules/prettier',
  resetModules: true,
  restoreMocks: true,
  setupFiles: ['<rootDir>/src/config/jest/init.js'],
  transform: {
    '^.+\\.(jsx?)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(tsx?)$': '<rootDir>/node_modules/ts-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  verbose: process.env.NODE_ENV === 'test'
};
