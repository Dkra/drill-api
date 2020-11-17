const mongoose = require('mongoose')
import RoleModel, { Roles } from '../models/role.model'

const startMongoConnection = () => {
  const uri = process.env['MONGO_ATLAS_URI']

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('Mongo Atlas connected!')
  })

  // Test action
  mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Initial setup for Roles
  initialRoleSetup()
}
export default startMongoConnection

function initialRoleSetup() {
  RoleModel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new RoleModel({
        name: Roles.USER,
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new RoleModel({
        name: Roles.ADMIN,
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}
