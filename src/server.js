import 'dotenv/config'
import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express'
// require('express-async-errors');
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

app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }
  console.log('error middleware!!!!', error);
  return res
    .status(error.statusCode)
    .json({
      error: error.message
    });
});

app.listen(SEVER_RUNNING_PORT, () => {
  console.log(`app is listening to port ${SEVER_RUNNING_PORT}`)
})

export default app