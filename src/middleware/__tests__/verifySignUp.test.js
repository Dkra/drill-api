import mongoose from 'mongoose'
import { checkDuplicateEmail } from '../verifySignUp'
import { buildReq, buildRes, buildNext } from '../../utils/testHelper'
import { BadRequest } from '../../utils/errors'
import { setupMongooseMongoMemoryDB } from '../../utils/modelTestingUtils'
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
      },
    })
    const res = buildRes()
    const next = buildNext()

    await checkDuplicateEmail(req, res, next)
    expect(next).toBeCalledWith()
  })

  test('if email is taken', async () => {
    await UserModel.create({
      username: 'brian',
      email: 'same email',
    })

    const req = buildReq({
      body: {
        username: 'roger',
        email: 'same email',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await checkDuplicateEmail(req, res, next).then(() => {
      expect(next).toBeCalledWith(
        new BadRequest('Failed! Email is already taken!'),
      )
    })
  })
})
