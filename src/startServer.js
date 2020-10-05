import 'dotenv/config'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
// require('express-async-errors');
import bodyParser from 'body-parser'
import article from './article'

const {
  PORT
} = process.env


function startServer({
  port = PORT
} = {}) {

  const app = express()

  app.use(bodyParser.json())

  // Routing
  app.get('/', (req, res) => {
    res.send('Welcome to Drill API')
  })
  app.use('/articles', article)

  // NOT FOUND
  app.get('*', function (req, res, next) {
    const error = new Error(`${req.ip} tried to access ${req.originalUrl}`)
    error.statusCode = 301

    next(error)
  })

  // Error hanlding
  app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500

    if (error.statusCode === 301) {
      return res.status(301).redirect('/not-found')
    }
    console.log('error middleware!!!!', error)
    return res.status(error.statusCode).json({
      error: error.message,
    })
  })

  return new Promise((res, rej) => {
    try {
      const server = app.listen(port, () => {
        console.info(`Listening on port ${server.address().port}`)
        const originalClose = server.close.bind(server)
        server.close = () => {
          return new Promise(resolveClose => {
            originalClose(resolveClose)
          })
        }
        res(server)
      })
    } catch (err) {
      rej(err)
    }
  })
}
export default startServer