import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const dataset = []

app.get('/', (req, res) => {
  console.log('This is the request hitting the root path')
  res.send('hello')
})

app.get('/data', (req, res) => {
  res.json(dataset)
})

app.post('/data', (req, res) => {
  const requestBody = req.body
  dataset.push({...requestBody, timestamp: Date.now()})
  res.json({...requestBody})
})

export default app