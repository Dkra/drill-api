import express from 'express'
import bodyParser from 'body-parser'
import article from './article/index.js'
const app = express()

app.use(bodyParser.json())
app.use('/article', article)

app.get('/', (req, res) => {
  res.send('Welcome to Node Babel')
})

app.listen(5000, () => {
  console.log(`app is listening to port 5000`)
})
