import mongoose from 'mongoose'
import { checkDuplicateEmail } from '../verifySignUp'
import { buildReq, buildRes, buildNext } from '../testHelper'
import { BadRequest } from '../errors'
import { setupMongooseMongoMemoryDB } from '../modelTestingUtils'
import UserModel from '../../models/user.model'

describe('checkDuplicateEmail()', () => {
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
    const req = buildReq({
      body: {
        username: 'roger',
        email: 'roger@gmail.com',
        password: '******',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await expect(checkDuplicateEmail(req, res, next)).resolves.toBe(undefined)
  })

  test('if email is taken', async () => {
    await UserModel.create({
      username: 'brian',
      email: 'same email',
      password: '******',
    })

    const req = buildReq({
      body: {
        username: 'roger',
        email: 'same email',
        password: '******',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await expect(checkDuplicateEmail(req, res, next)).rejects.toThrow(
      new BadRequest('Failed! Email is already taken!'),
    )
  })
})
