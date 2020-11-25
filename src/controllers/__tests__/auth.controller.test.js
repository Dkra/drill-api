import mongoose from 'mongoose'
import { buildReq, buildRes, buildNext } from '../../utils/testHelper'
import { BadRequest } from '../../utils/errors'
import { setupMongooseMongoMemoryDB } from '../../utils/modelTestingUtils'
import { signUp } from '../auth.controller'
import UserModel from '../../models/user.model'

// Unit Testing with MongoMemoryDB

describe('signUp()', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await setupMongooseMongoMemoryDB()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  // Modle Clean up
  beforeEach((done) => {
    UserModel.remove({}, (err) => {
      done()
    })
  })

  test('happy path', async () => {
    const email = 'roger@gmail.com'
    const req = buildReq({
      body: {
        username: 'roger',
        email,
        password: '11112222',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await signUp(req, res, next)
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        data: expect.any(Object),
        accessToken: expect.any(String),
      }),
    )
  })

  test('if missing email', async () => {
    const email = null

    const req = buildReq({
      body: {
        username: 'roger',
        email,
        password: '11112222',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await signUp(req, res, next)

    expect(next.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        [Error: email is required!],
      ]
    `)
  })
  test.only('if missing password', async () => {
    const password = null

    const req = buildReq({
      body: {
        username: 'roger',
        email: 'email@',
        password,
      },
    })
    const res = buildRes()
    const next = buildNext()

    await signUp(req, res, next)

    expect(next.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        [Error: password is required!],
      ]
    `)
  })
})
