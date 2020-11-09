import {
  buildNext,
  buildArticle,
  buildReq,
  buildRes,
} from '../../../utils/testHelper'
import articleDB from '../../db'
import { createArticle, getArticle } from '..'

jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

test('getArticle() happy path', async () => {
  // Arrange
  const params = {
    title: 'my title',
    content: 'my content',
  }
  const req = buildReq({ params: { id: 1 } })
  const res = buildRes()
  const next = buildNext()

  const dummyItem = [buildArticle(params)]

  articleDB.get.mockResolvedValue(dummyItem)

  // Act
  console.log('req', req)
  await getArticle(req, res, next)

  // Assert
  expect(articleDB.get).toHaveBeenCalledTimes(1)
  expect(articleDB.get).toHaveBeenCalledWith(1)

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
