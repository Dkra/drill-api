const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Role',
    //   },
    // ],
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    accessToken: {
      type: String,
    },
  }),
)

module.exports = User
