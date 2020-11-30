import 'dotenv/config'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import morgan from 'morgan'
import winston from 'winston'
import router from './routes'
import handleErrors from './middleware/handleErrors'
import createLogger from './utils/logger'
import bodyParser from 'body-parser'
import article from './article'
import startMongoConnection from './utils/mongoConnection'

const { PORT } = process.env

function startServer({ port = PORT } = {}) {
  startMongoConnection()
  const app = express()

  app.use(bodyParser.json())

  // Logger
  const logger = createLogger() // Winston

  // streamed with ist and utc
  app.use(morgan('combined', { stream: logger.stream.write })) // Morgon - HTTP request logger middleware

  // Routing
  app.use('/', router)
  // app.get('/', (req, res) => {
  //   res.send('Welcome to Drill API')
  // })
  app.use('/articles', article)

  app.get('/not-found', (req, res) => {
    if (req.accepts('json')) {
      res.send({ error: 'Not found' })
      return
    }
  })

  // Error Middleware
  app.use(handleErrors)

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.info('PORT:', PORT, 'TimeAt:', new Date().getMilliseconds())
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose)
        })
      }
      resolve(server)
    })
  })
}
export default startServer
