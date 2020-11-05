import mongoose from 'mongoose'
import { setupMongooseMongoMemoryDB } from '../../../utils/modelTestingUtils'
import ArticleModel from '../../db/ArticleModel'
const { add, get, update, remove } = require('../../db/index.js')

let mongoServer

beforeAll(async () => {
  mongoServer = await setupMongooseMongoMemoryDB()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

// Modle Clean up
beforeEach((done) => {
  ArticleModel.remove({}, (err) => {
    done()
  })
})

describe('Article Model Test', () => {
  const articleData = {
    title: 'my title',
    content: 'my content',
  }

  it('add()', async () => {
    const data = await add(articleData)

    expect(await ArticleModel.countDocuments()).toEqual(1)
    expect(data.title).toEqual(articleData.title)
    expect(data.content).toEqual(articleData.content)
  })

  it('get()', async () => {
    // Make sure clean-up
    expect(await ArticleModel.countDocuments()).toEqual(0)

    const createdData = await add(articleData)
    const data = await get(createdData._id)

    expect(createdData.title).toEqual(articleData.title)
    expect(createdData.content).toEqual(articleData.content)
    expect(await ArticleModel.countDocuments()).toEqual(1)
  })

  it('update() with both title, content', async () => {
    // Make sure clean-up
    expect(await ArticleModel.countDocuments()).toEqual(0)

    const createdData = await add(articleData)
    const updatedStub = {
      _id: createdData._id,
      title: 'updated title',
      content: 'updated content',
    }
    const updatedD = await update(updatedStub)

    expect(updatedD.title).toEqual(updatedStub.title)
    expect(updatedD.content).toEqual(updatedStub.content)
  })

  it('update() with only title', async () => {
    // Make sure clean-up
    expect(await ArticleModel.countDocuments()).toEqual(0)

    const createdData = await add(articleData)
    const updatedStub = {
      _id: createdData._id,
      title: 'updated title',
    }
    await update(updatedStub)
    const updatedD = await get(createdData._id)

    expect(updatedD.title).toEqual(updatedStub.title)
    expect(updatedD.content).toEqual(createdData.content) // old
  })

  it('remove()', async () => {
    // Make sure clean-up
    expect(await ArticleModel.countDocuments()).toEqual(0)

    // Create
    const createdData = await add(articleData)
    expect(await ArticleModel.countDocuments()).toEqual(1)

    // Remove
    await remove(createdData._id)
    expect(await ArticleModel.countDocuments()).toEqual(0)
  })
})
