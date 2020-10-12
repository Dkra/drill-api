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

test('getArticles() happy path', async () => {
  // Arrange
  const params = {
    title: 'my title',
    content: 'my content',
  }
  const req = buildReq()
  const res = buildRes()
  const dummyItems = [
    buildArticle(params),
    buildArticle({ ...params, idCounter: 2 }),
  ]

  articleDB.getAll.mockResolvedValue(dummyItems)

  // Act
  await getArticles(req, res)

  // Assert
  expect(articleDB.getAll).toHaveBeenCalledTimes(1)
  expect(articleDB.getAll).toHaveBeenCalledWith()

  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith(dummyItems)
})
