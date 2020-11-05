const ArticleModel = require('./ArticleModel')

const get = (id) => {
  return ArticleModel.findById(id)
}

const add = ({ title, content }) => {
  if (!title || !content) {
    throw new Error('parameter missing!')
  } else {
    return ArticleModel.create({ title, content })
  }
}
const getAll = () => {}

const update = ({ _id, title, content }) => {
  // At least one of "title" or "content" is passing
  const updateObj = {}
  if (title !== undefined) updateObj.title = title
  if (content !== undefined) updateObj.content = content

  return ArticleModel.findByIdAndUpdate(_id, updateObj, {
    // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
    new: true,
  })
}

const remove = (_id) => {
  return ArticleModel.deleteOne({ _id })
}

export default {
  get,
  add,
  getAll,
  remove,
  update,
}
export { get, add, getAll, remove, update }
