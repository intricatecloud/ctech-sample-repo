import request from 'supertest'
import app from './app.js'

describe('app', () => {
  it('gets data', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  it('returns 401 if no token is provided', async () => {
    const response = await request(app).get('/data')
    expect(response.statusCode).toBe(401)
  })

  it('returns 200 when a valid token is provided', async () => {
    const response = await request(app).get('/data')
      .set('Authorization', 'token')
    expect(response.statusCode).toBe(200)
  })

  it('saves data for authorized users', async () => {
    const response = await request(app).post('/data')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'token')
      .send({message: 'Hey Dwight!'})
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Hey Dwight!')
  })
})