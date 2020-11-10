import axios from 'axios'

import startServer from '../../startServer'
import { addArticle } from './utils'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Integration [createArticle]', async () => {
  const { CData, expectedData } = await addArticle(axios, server)

  // Create
  expect(CData).toEqual(expect.objectContaining(expectedData))
})
