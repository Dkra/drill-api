import { buildArticle, buildReq, buildRes } from '../../../utils/testHelper'
import articleDB from '../../db'
import { delArticle } from '..'

jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('delArticle()', () => {
  let id = 1

  test('delArticle() happy path', async () => {
    // Arrange
    const params = {
      title: 'my title',
      content: 'my content',
    }
    const req = buildReq({
      params: {
        id,
      },
      body: params,
    })
    const res = buildRes()

    articleDB.remove.mockResolvedValue({
      success: true,
    })

    // Act
    await delArticle(req, res)

    // Assert
    expect(articleDB.remove).toHaveBeenCalledTimes(1)
    expect(articleDB.remove).toHaveBeenCalledWith(id)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
    })
  })
})
