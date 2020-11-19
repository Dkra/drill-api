import mongoose from 'mongoose'
import { checkDuplicateUsernameOrEmail } from '../verifySignUp'
import { buildReq, buildRes, buildNext } from '../../utils/testHelper'
import { BadRequest } from '../../utils/errors'
import { setupMongooseMongoMemoryDB } from '../../utils/modelTestingUtils'
import UserModel from '../../models/user.model'

describe('checkDuplicateUsernameOrEmail()', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await setupMongooseMongoMemoryDB()
  })

  afterAll(async () => {
    debugger
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  // Modle Clean up
  beforeEach((done) => {
    UserModel.remove({}, (err) => {
      done()
    })
  })

  test.skip('happy path', async () => {
    // await UserModel.create({
    //   username: 'rogerxx',
    //   email: 'roger@gmail.comxx',
    //   password: 'xxxxx',
    // })

    const req = buildReq({
      body: {
        username: 'roger',
        email: 'roger@gmail.com',
      },
    })
    const res = buildRes()
    const next = buildNext()

    await expect(
      await checkDuplicateUsernameOrEmail(req, res, next),
    ).resolves.toEqual()
    expect(next).toBeCalledWith()
  })

  //   test('if error occur is taken', () => {})
  test.only('if username is taken', async () => {
    debugger
    try {
      await UserModel.create({
        username: 'roger',
        email: '----------',
        password: 'xxxxx',
      })
    } catch (err) {
      debugger
      console.log('err~~~~~~~~', err)
    }

    const req = buildReq({
      body: {
        username: 'roger',
        email: '----------',
      },
    })
    const res = buildRes()
    const next = buildNext()
    try {
      await checkDuplicateUsernameOrEmail(req, res, next)
      const flushPromises = () => new Promise(setImmediate)
      await flushPromises()
      expect(next).toBeCalledWith('Unhandled Username is already taken!')
      // expect(next.mock.calls[0]).toMatchInlineSnapshot()
    } catch (err) {
      debugger
      console.log('err~~~~~~~~', err)
    }
  })

  //   test('if email is taken', () => {})
})
