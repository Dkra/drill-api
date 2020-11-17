const mongoose = require('mongoose')

const RoleModel = mongoose.model(
  'Role',
  new mongoose.Schema({
    name: String,
  }),
)

const Roles = {
  ADMIN: 'admin',
  USER: 'user',
}

export { Roles }

export default RoleModel
