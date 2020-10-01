import BadRequestError from '../../utils/error'
import articleDB from '../db'

/*
  Controller
*/

// Create
async function createArticle(req, res, next) {
  const {
    title,
    content
  } = req.body

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

  const createdArticle = await articleDB
    .add({
      title,
      content,
    })
    .catch((error) => next(new BadRequestError(error)))

  console.log('createdArticle', createdArticle)
  res.json(createdArticle)
}

// Read-all
async function getArticles(req, res, next) {
  const getAllArticle = await articleDB.readAll()
  res.json(getAllArticle)
}

// Read
async function getArticle(req, res, next) {
  console.log('req.params.id', req.params.id)
  const getArticle = await articleDB
    .read(req.params.id)
    .catch((error) => next(new BadRequestError(error)))
  res.json(getArticle)
}

// update
async function putArticle(req, res, next) {
  const {
    _id,
    title,
    content
  } = req.body

  if (title === undefined)
    res.status(400).json({
      message: `no title provided!`,
    })
  if (content === undefined)
    res.status(400).json({
      message: `no content provided!`,
    })

  const data = await articleDB
    .update({
      _id,
      title,
      content,
    })
    .catch((error) => next(new BadRequestError(error)))
  res.json(data)
}

// Delete
async function delArticle(req, res, next) {
  const {
    id
  } = req.params
  const data = await articleDB
    .remove(id)
    .catch((error) => next(new BadRequestError(error)))
  res.json(data)
}

export {
  createArticle,
  getArticles,
  getArticle,
  delArticle,
  putArticle
}