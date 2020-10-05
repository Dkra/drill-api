const { async } = require('regenerator-runtime')

// Random port for each test file
const port =
  Number(process.env.SEVER_RUNNING_PORT) + Number(process.env.JEST_WORKER_ID)
process.env.PORT = process.env.PORT || port
