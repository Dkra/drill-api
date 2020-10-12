import axios from 'axios'

import startServer from '../../startServer'
import {
  addArticle
} from './utils'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Integration [createArticle]', async () => {
  await addArticle(axios, server)
  await addArticle(axios, server, 2)


  // Real-All (create one more article, expected length 2)
  const {
    data: {
      article: rAllData
    },
  } = await axios.get(
    `http://localhost:${server.address().port}/articles/`,
  )
  expect(rAllData.length).toBe(2)
})