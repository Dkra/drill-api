import axios from 'axios'

import startServer from '../../startServer'
import { addArticle } from './utils'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Integration [createArticle]', async () => {
  const { _id } = await addArticle(axios, server)

  // Update
  const updateBody = {
    title: 'new title',
    content: 'new title',
  }
  const { data: uData } = await axios.put(
    `http://localhost:${server.address().port}/articles/${_id}`,
    updateBody,
  )
  expect(uData.title).toEqual(updateBody.title)
  expect(uData.content).toEqual(updateBody.content)
})
