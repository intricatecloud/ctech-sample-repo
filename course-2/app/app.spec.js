import request from 'supertest'
import app from './app.js'

describe('app', () => {
  it('gets data', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  it('saves data', async () => {
    let response = await request(app).post('/data')
      .set('Content-Type', 'application/json')
      .send({message: 'Hey Dwight!'})
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Hey Dwight!')

    response = await request(app).get('/data')
    expect(response.statusCode).toBe(200)
    expect(response.body[0]).toEqual(jasmine.objectContaining({message: 'Hey Dwight!'}))
  })
})