import axios from 'axios'
import {
  buildArticle
} from '../../utils/testHelper'
import startServer from '../../startServer'

let server;
beforeAll(async () => {
  server = await startServer()
})

afterAll(() => server.close())

test('Article CRUD integration test', async () => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const expectedData = buildArticle(body)
  console.log('expectedData', expectedData)
  const {
    data: CData
  } = await axios.post(`http://${server.address().port}/articles/`, body)

  // Create
  expect(CData).toMatchObject(expectedData)

  // Read

  // Update

  // Delete
})

test('Article CRUD integration test', async () => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const expectedData = buildArticle(body)
  console.log('expectedData', expectedData)
  const {
    data: CData
  } = await axios.post(`http://${server.address().port}/articles/`, body)

  // Create
  expect(CData).toMatchObject(expectedData)

  // Read

  // Update

  // Delete
})