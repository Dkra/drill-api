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
const { add } = require('../index.js')

const articleData = {
  title: 'my title',
  content: 'my content',
}

let mongoServer

beforeAll(async () => {
  mongoServer = await setupMongooseMongoMemoryDB()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Article Model Test', () => {
  it('create & save article successfully', async () => {
    expect(await ArticleModel.countDocuments()).toEqual(0)

    await ArticleModel.create(articleData)
    expect(await ArticleModel.countDocuments()).toEqual(1)
  })
})
