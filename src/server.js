import 'dotenv/config'
import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express'
require('express-async-errors');
import bodyParser from 'body-parser'
import article from './article'

const {
  SEVER_RUNNING_PORT
} = process.env
console.log('SEVER_RUNNING_PORT', SEVER_RUNNING_PORT)
const app = express()

app.use(bodyParser.json())
app.use('/article', article)

app.get('/', (req, res) => {
  res.send('Welcome to Node Babel')
})

app.listen(SEVER_RUNNING_PORT, () => {
  console.log(`app is listening to port ${SEVER_RUNNING_PORT}`)
})

export default app