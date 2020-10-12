import axios from 'axios'
import { buildArticle } from '../../utils/testHelper'
import startServer from '../../startServer'
import { createArticle } from '../controller'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

export const addArticle = async (id = 1) => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const _id = id
  const expectedData = buildArticle(body)
  const {
    data: { article: CData },
  } = await axios.post(
    `http://localhost:${server.address().port}/articles/`,
    body,
  )

  return {
    CData,
    expectedData,
    _id,
  }
}

test('Integration [createArticle]', async () => {
  const { CData, expectedData, _id } = await addArticle()

  // Create
  expect(CData).toMatchObject([{ ...expectedData, _id }])
  expect(CData.length).toBe(1)
})
