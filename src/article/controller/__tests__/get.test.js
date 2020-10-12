import { buildArticle, buildReq, buildRes } from '../../../utils/testHelper'
import articleDB from '../../db'
import {
  createArticle,
  getArticles,
  getArticle,
  delArticle,
  putArticle,
} from '..'

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
  const dummyItem = [buildArticle(params)]

  articleDB.get.mockResolvedValue(dummyItem)

  // Act
  console.log('req', req)
  await getArticle(req, res)

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
