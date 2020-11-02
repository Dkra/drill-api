const path = require('path')

module.exports = {
  testEnvironment: 'node',
  roots: [path.join(__dirname, './src')],
  rootDir: path.join(__dirname, '.'),
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  verbose: true,
  setupFiles: ['dotenv/config'], // Dotenv
  setupFilesAfterEnv: ['./jest.afterenv.js'], // https://jestjs.io/docs/en/configuration#setupfiles-array
}
