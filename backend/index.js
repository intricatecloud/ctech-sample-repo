import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
const PORT = 8080
const app = express()

const user = {
  _id: 1,
  username: 'admin',
  password: 'password',
  email: 'admin@place.com'
}

passport.use(new LocalStrategy((username, password, done) => {
  if(username === user.username && password == user.password) {
    done(null, user)
  } else {
    done(null, false, { message: 'invalid username/password'})
  }
}))

app.get('/', (req, res) => {
  res.text('hello')
})


app.get('/data', (req, res) => {
  res.json({message: 'nice'})
})

app.listen(PORT)
console.log("Server started at http://localhost:" + PORT);