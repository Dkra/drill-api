const mongoose = require('mongoose')

// Create a simple article's schema
const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: Date,
  loginUsing: String,
})

const articleModel = new mongoose.model('Article', articleSchema)

module.exports = articleModel
