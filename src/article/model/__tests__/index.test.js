// const mongoose = require('mongoose')

// const databaseName = 'drill'

// describe('Article Model Test', () => {
//   beforeAll(async () => {
//     const url = `mongodb://127.0.0.1/${databaseName}`
//     await mongoose.connect(url, { useNewUrlParser: true })
//   })

//   it('create & save article successfully', async () => {
//     const validArticle = new ArticleModel(articleData)
//     const savedArticle = await validArticle.save()

//     // Object Id should be defined when successfully saved to MongoDB.
//     expect(savedArticle._id).toBeDefined()
//     expect(savedArticle.title).toBe(articleData.title)
//     expect(savedArticle.content).toBe(articleData.content)
//   })

// it('create & save user successfully', async () => {
//   const validUser = new UserModel(userData)
//   const savedUser = await validUser.save()
//   // Object Id should be defined when successfully saved to MongoDB.
//   expect(savedUser._id).toBeDefined()
//   expect(savedUser.name).toBe(userData.name)
//   expect(savedUser.gender).toBe(userData.gender)
//   expect(savedUser.dob).toBe(userData.dob)
//   expect(savedUser.loginUsing).toBe(userData.loginUsing)
// })

// Test Schema is working!!!
// You shouldn't be able to add in any field that isn't defined in the schema
// it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
//   const userWithInvalidField = new UserModel({
//     name: 'TekLoon',
//     gender: 'Male',
//     nickname: 'Handsome TekLoon',
//   })
//   const savedUserWithInvalidField = await userWithInvalidField.save()
//   expect(savedUserWithInvalidField._id).toBeDefined()
//   expect(savedUserWithInvalidField.nickkname).toBeUndefined()
// })

// // Test Validation is working!!!
// // It should us told us the errors in on gender field.
// it('create user without required field should failed', async () => {
//   const userWithoutRequiredField = new UserModel({ name: 'TekLoon' })
//   let err
//   try {
//     const savedUserWithoutRequiredField = await userWithoutRequiredField.save()
//     error = savedUserWithoutRequiredField
//   } catch (error) {
//     err = error
//   }
//   expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
//   expect(err.errors.gender).toBeDefined()
// })
// })

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

  // it('add() should throw error if missing paraterms', async () => {
  //   console.log('add', add)
  //   const data = await add({title: '123', /* content: 'content'*/})

  //   expect(data).toBeThrown.add
  //   expect(data.content).toEqual(articleData.content)
  // })

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
