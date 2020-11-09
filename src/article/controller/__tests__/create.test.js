import {
  buildArticle,
  buildReq,
  buildRes,
  buildNext,
} from '../../../utils/testHelper'
import articleDB from '../../db'
import { createArticle } from '../'

jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createArticle() happy path', async () => {
  // Arrange
  const parmas = {
    title: 'my title',
    content: 'my content',
  }
  const req = buildReq({
    body: parmas,
  })
  const res = buildRes()
  const dummyItem = buildArticle(parmas)

  articleDB.add.mockResolvedValue(dummyItem)

  // Act
  await createArticle(req, res)

  // Assert
  expect(articleDB.add).toHaveBeenCalledTimes(1)
  expect(articleDB.add).toHaveBeenCalledWith(parmas)

  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith(dummyItem)
})

test('createArticle() return 404 if no [title] provided', async () => {
  // Arrange
  const parmas = {
    // title: 'my title',
    content: 'my content',
  }
  const req = buildReq({ body: parmas })
  const res = buildRes()
  const next = buildNext()

  // Act
  await createArticle(req, res, next)

  // Assert
  expect(next).toHaveBeenCalledTimes(1)
  expect(next.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      [Error: no title provided!!!],
    ]
  `)
})

test('createArticle() return 404 if no [content] provided', async () => {
  // Arrange
  const parmas = {
    title: 'my title',
    // content: 'my content',
  }
  const req = buildReq({ body: parmas })
  const res = buildRes()
  const next = buildNext()

  // Act
  await createArticle(req, res, next)

  // Assert
  expect(next).toHaveBeenCalledTimes(1)
  expect(next.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      [Error: no content provided!],
    ]
  `)
})
