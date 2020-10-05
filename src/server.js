import startServer from './startServer'
const {
  SEVER_RUNNING_PORT
} = process.env

startServer({
  port: SEVER_RUNNING_PORT
})