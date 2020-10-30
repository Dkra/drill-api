const path = require('path')

module.exports = {
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  setupFiles: ['dotenv/config'], // Dotenv
  roots: [path.join(__dirname, './src')],
  rootDir: path.join(__dirname, '.'),
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  verbose: true,
  setupFilesAfterEnv: ['./jest.afterenv.js'], // https://jestjs.io/docs/en/configuration#setupfiles-array
}
