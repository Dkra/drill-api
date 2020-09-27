import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import article from './article/index.js'

const { SEVER_RUNNING_PORT } = process.env
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
