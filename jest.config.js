module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test_OLD/',
    '<rootDir>/src/config/test.ts',
    '<rootDir>/dist',
  ],
  coverageReporters: ['text-summary', 'html'],
  collectCoverageFrom: ['src/**/*.ts', '!src/bin/*.ts'],
};
