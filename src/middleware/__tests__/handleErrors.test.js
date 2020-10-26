import handleErrors from '../handleErrors'
import { buildReq, buildRes } from '../../utils/testHelper'
import { BadRequest, NotFound } from '../../utils/errors'

test('handleErros() should return 400 with BadRequest', async () => {
  // Arrange
  const msg = 'parameter required!'
  const err = new BadRequest(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  await handleErrors(err, req, res)

  // Assert
  expect(res.status).toBeCalledWith(400)
  expect(res.json).toBeCalledWith({
    status: 'error',
    message: msg,
  })
})

test('handleErros() should return 404 with NotFount', async () => {
  // Arrange
  const msg = 'This url is not exist!'
  const err = new NotFound(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  await handleErrors(err, req, res)

  expect(res.status).toBeCalledWith(404)
  expect(res.json).toBeCalledWith({
    status: 'error',
    message: msg,
  })
})

test('handleErros() should return 500 otherwise', async () => {
  // Arrange
  const msg = 'Server Error Occur'
  const err = new Error(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  await handleErrors(err, req, res)

  expect(res.status).toBeCalledWith(500)
  expect(res.json).toBeCalledWith({
    status: 'error',
    message: msg,
  })
})
