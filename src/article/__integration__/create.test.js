import axios from 'axios'

import startServer from '../../startServer'
import { addArticle } from './utils'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Integration [createArticle]', async () => {
  try {
    const { CData, expectedData, _id } = await addArticle(axios, server)

    // Create
    expect(CData).toMatchObject([
      {
        ...expectedData,
        _id,
      },
    ])
    expect(CData.length).toBe(1)
  } catch (err) {
    console.log('err', err)
  }
})
