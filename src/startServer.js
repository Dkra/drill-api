import 'dotenv/config'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
const handleErrors = require('./middleware/handleErrors')
import bodyParser from 'body-parser'
import article from './article'

const { PORT } = process.env

function startServer({ port = PORT } = {}) {
  const app = express()

  app.use(bodyParser.json())

  // Routing
  app.get('/', (req, res) => {
    res.send('Welcome to Drill API')
  })
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
      console.info('PORT', PORT, new Date().getMilliseconds())
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
