import axios from 'axios'
import { buildArticle } from '../../utils/testHelper'
import startServer from '../../startServer'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Article CRUD integration test', async () => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const _id = 1
  const expectedData = buildArticle(body)
  // console.log('expectedData', expectedData)
  const {
    data: { article: CData },
  } = await axios.post(
    `http://localhost:${server.address().port}/articles/`,
    body,
  )

  // Create
  expect(CData).toMatchObject([{ ...expectedData, _id }])

  // Read
  const {
    data: { article: rData },
  } = await axios.get(
    `http://localhost:${server.address().port}/articles/${_id}`,
  )
  expect(rData).toMatchObject([{ ...expectedData, _id }])

  // Update
  const updated = {
    title: 'new title',
    content: 'new title',
  }
  const { data: uData } = await axios.put(
    `http://localhost:${server.address().port}/articles/${_id}`,
    updated,
  )
  expect(uData).toMatchObject([{ ...updated, _id }])

  // Delete
})
