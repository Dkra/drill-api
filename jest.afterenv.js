/*
 https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 This script file presents you the opportunity of running some code 
 immediately after thetest framework has been installed in the environment.
*/
// Support async/await syntax
const { async } = require('regenerator-runtime')

// Random port for each test file
const port =
  Number(process.env.SEVER_RUNNING_PORT) + Number(process.env.JEST_WORKER_ID)
process.env.PORT = process.env.PORT || port

console.log('port', process.env.PORT)
