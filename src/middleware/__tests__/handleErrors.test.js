import handleErrors from '../handleErrors'
import { buildReq, buildRes } from '../../utils/testHelper'
import { BadRequest, NotFound } from '../../utils/errors'

test('handleErros() should return 400 with BadRequest', () => {
  // Arrange
  const msg = 'parameter required!'
  const err = new BadRequest(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  handleErrors(err, req, res)

  // Assert
  expect(res.status).toBeCalledWith(400)
  expect(res.json).toBeCalledWith({
    status: err.status,
    message: err.message,
  })
})

test('handleErros() should return 404 with NotFount', () => {
  // Arrange
  const msg = 'This url is not exist!'
  const err = new NotFound(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  handleErrors(err, req, res)

  expect(res.status).toBeCalledWith(404)
  expect(res.json).toBeCalledWith({
    status: err.status,
    message: err.message,
  })
})

test('handleErros() should return 500 otherwise', () => {
  // Arrange
  const msg = 'Server Error Occur'
  const err = new Error(msg)
  const req = buildReq()
  const res = buildRes()

  // Act
  handleErrors(err, req, res)

  expect(res.status).toBeCalledWith(500)
  expect(res.json).toBeCalledWith({
    status: err.status,
    message: err.message,
  })
})
