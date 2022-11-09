import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()


app.use(cors())
// use cookies
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const user = {
  _id: 1,
  username: 'admin',
  password: 'password',
  email: 'admin@place.com'
}

const dataset = []

passport.use(new LocalStrategy((username, password, done) => {
  if(username === user.username && password == user.password) {
    done(null, user)
  } else {
    done(null, false, { message: 'invalid username/password'})
  }
}))

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/data', (req, res) => {
  const authToken = req.header('Authorization')
  if (authToken) {
    res.json(dataset)
  } else {
    res.status(401).send('Not authorized')
  }
})


app.post('/data', (req, res) => {
  const authToken = req.header('Authorization')
  if (authToken) {
    const requestBody = req.body
    dataset.push({...requestBody, userKey: 'user-key', timestamp: Date.now()})
    res.json({...requestBody})
  } else {
    res.status(401).send('Not authorized')
  }

})

export default app