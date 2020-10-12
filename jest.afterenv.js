/*
 https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 This script file presents you the opportunity of running some code 
 immediately after thetest framework has been installed in the environment.
*/

jest.setTimeout(10000) // in milliseconds

// Support async/await syntax
const {
  async
} = require('regenerator-runtime')

// Random port for each test file
// const port = 8800 + Number(process.env.JEST_WORKER_ID)
// process.env.PORT = process.env.PORT || port

const port = 8800 + Number(process.env.JEST_WORKER_ID)
process.env.PORT = process.env.PORT || port