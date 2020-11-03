const ArticleModel = require('./ArticleModel')
const get = () => {}
const add = ({ title, content }) => {
  if (!title || !content) {
    throw new Error('parameter missing!')
  } else {
    return ArticleModel.create({ title, content })
  }
}
const getAll = () => {}
const remove = () => {}
const update = () => {}

export default {
  get,
  add,
  getAll,
  remove,
  update,
}
