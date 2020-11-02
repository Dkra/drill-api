import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

async function setupMongooseMongoMemoryDB() {
  // May require additional time for downloading MongoDB binaries
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

  let mongoServer
  const opts = { useNewUrlParser: true, useUnifiedTopology: true }

  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  //   console.log('mongoUri!!!!!', mongoUri)
  //   console.log('server port!!!!!', await mongoServer.getPort())
  //   console.log('getDbName!!!!!', await mongoServer.getDbName())
  //   console.log('-------------------------------------')
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err)
  })

  return mongoServer
}

export { setupMongooseMongoMemoryDB }
