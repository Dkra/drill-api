import axios from 'axios'
import startServer from '../../startServer'
import { addArticle } from './create.test'
import { async } from 'regenerator-runtime'

let server
beforeAll(async () => {
  server = await startServer()
})

afterAll(async () => {
  // console.log('server!!!!!!!!!!!!!!', server.close)
  server.close()
  await new Promise((resolve) => setTimeout(() => resolve(), 10000)) // avoid jest open handle error
})

test('Integration [getArticle]', async () => {
  // Create
  const { expectedData, _id } = await addArticle()

  // Read
  const {
    data: { article: rData },
  } = await axios.get(
    `http://localhost:${server.address().port}/articles/${_id}`,
  )
  expect(rData).toMatchObject([{ ...expectedData, _id }])
})
