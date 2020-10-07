import BadRequestError from '../../utils/error'
import ArticleModel from '../model'

/*
  Controller
*/

// Create
async function createArticle(req, res, next) {
  const { title, content } = req.body

  if (title === undefined) {
    res.status(400).json({
      message: `no title provided!`,
    })
    return
  }

  if (content === undefined) {
    res.status(400).json({
      message: `no content provided!`,
    })
    return
  }

  const createdArticle = await ArticleModel.add({
    title,
    content,
  }).catch((error) => next(new BadRequestError(error)))

  res.json(createdArticle)
}

// Read-all
async function getArticles(req, res, next) {
  const getAllArticle = await ArticleModel.getAll()
  res.json(getAllArticle)
}

// Read
async function getArticle(req, res, next) {
  const getArticle = await ArticleModel.get(req.params.id).catch((error) =>
    next(new BadRequestError(error)),
  )
  res.json(getArticle)
}

// update
async function putArticle(req, res, next) {
  const { id } = req.params
  const { title, content } = req.body

  if (title === undefined)
    res.status(400).json({
      message: `no title provided!`,
    })
  if (content === undefined)
    res.status(400).json({
      message: `no content provided!`,
    })

  const data = await ArticleModel.update({
    _id: id,
    title,
    content,
  }).catch((error) => next(new BadRequestError(error)))
  res.json(data)
}

// Delete
async function delArticle(req, res, next) {
  const { id } = req.params
  const data = await ArticleModel.remove(id).catch((error) =>
    next(new BadRequestError(error)),
  )
  res.json(data)
}

export { createArticle, getArticles, getArticle, delArticle, putArticle }
