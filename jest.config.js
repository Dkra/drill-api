const path = require('path')

module.exports = {
  testEnvironment: 'node',
  roots: [path.join(__dirname, './src')],
  rootDir: path.join(__dirname, '.'),
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'], // https://jestjs.io/docs/en/configuration#setupfiles-array
}