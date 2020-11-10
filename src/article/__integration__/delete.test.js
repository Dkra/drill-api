import axios from 'axios'

import startServer from '../../startServer'
import { addArticle } from './utils'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Integration [deleteArticle]', async () => {
  const { _id } = await addArticle(axios, server)

  // Delete
  const { data: delData } = await axios.delete(
    `http://localhost:${server.address().port}/articles/${_id}`,
  )

  expect(delData).toEqual(
    expect.objectContaining({
      deletedCount: 1,
    }),
  )
})
