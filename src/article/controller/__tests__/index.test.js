import 'regenerator-runtime/runtime' // move to jest setup file
import { buildArticle, buildReq, buildRes } from '../../../utils/testHelper'
import articleDB from '../../db'
import {
  createArticle,
  getArticles,
  getArticle,
  delArticle,
  putArticle,
} from '../'

jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createArticle()', async () => {
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

test.only('createArticle() return 404 if no [title] provided', async () => {
  // Arrange
  const parmas = {
    // title: 'my title',
    content: 'my content',
  }
  const req = buildReq({ body: parmas })
  const res = buildRes()

  // Act
  await createArticle(req, res)

  // Assert
  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "no title provided!",
      },
    ]
  `)
})

test.only('createArticle() return 404 if no [content] provided', async () => {
  // Arrange
  const parmas = {
    title: 'my title',
    // content: 'my content',
  }
  const req = buildReq({ body: parmas })
  const res = buildRes()

  // Act
  await createArticle(req, res)

  // Assert
  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "no content provided!",
      },
    ]
  `)
})
