import {
  buildArticle,
  buildReq,
  buildRes,
  buildNext,
} from '../../../utils/testHelper'
import articleDB from '../../db'
import { putArticle } from '..'

jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

test('putArticle() happy path', async () => {
  // Arrange
  const params = {
    title: 'my title',
    content: 'my content',
  }
  const id = 1
  const req = buildReq({
    params: {
      id,
    },
    body: params,
  })
  const res = buildRes()
  const next = buildNext()

  const dummyItem = buildArticle({
    ...params,
    idCounter: id,
  })

  articleDB.update.mockResolvedValue(dummyItem)

  // Act
  await putArticle(req, res, next)

  // Assert
  expect(articleDB.update).toHaveBeenCalledTimes(1)
  expect(articleDB.update).toHaveBeenCalledWith({
    ...params,
    _id: id,
  })

  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith(dummyItem)
})

test('putArticle() return 404 if no [title] & [content] provided', async () => {
  // Arrange
  const params = {
    // title: 'my title',
    // content: 'my content',
  }
  const req = buildReq({
    params: {
      id: 1,
    },
    body: params,
  })
  const res = buildRes()
  const next = buildNext()

  // Act
  await putArticle(req, res, next)

  // Assert
  expect(next).toHaveBeenCalledTimes(1)
  expect(next.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      [Error: no title provided!],
    ]
  `)
})
