import axios from 'axios'
import startServer from '../../startServer'
import { addArticle } from './utils'
import { async } from 'regenerator-runtime'

let server
beforeAll(async () => {
  server = await startServer()
})
afterAll(() => server.close())

test('Integration [getArticle]', async () => {
  // Create
  const { expectedData, _id } = await addArticle(axios, server)

  // Read
  const {
    data: { article: rData },
  } = await axios.get(
    `http://localhost:${server.address().port}/articles/${_id}`,
  )
  expect(rData).toMatchObject([
    {
      ...expectedData,
      _id,
    },
  ])
})

// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
// Filter

// Pagination

// Sorting
