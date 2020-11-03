const mongoose = require('mongoose')

// Create a simple article's schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
})

const articleModel = new mongoose.model('Article', articleSchema)

module.exports = articleModel
