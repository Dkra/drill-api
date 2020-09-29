const { async } = require('regenerator-runtime')
import axios from 'axios'
import { buildArticle } from '../../utils/testHelper'

test('Article CRUD integration test', async () => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const expectedData = buildArticle(body)
  console.log('expectedData', expectedData)
  const createdData = await axios.post('http://localhost:5000/article/', body)

  // Create
  expect(createdData).toMatchObject(expectedData)

  // Read

  // Update

  // Delete
})
