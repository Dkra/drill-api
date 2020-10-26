import { BadRequest } from '../../utils/errors'
import ArticleModel from '../model'

/*
  Controller
*/

// Create
async function createArticle(req, res, next) {
  const { title, content } = req.body

  try {
    if (title === undefined) {
      throw new BadRequest('no title provided!!!')
    }

    if (content === undefined) {
      throw new BadRequest('no content provided!')
    }

    const createdArticle = await ArticleModel.add({
      title,
      content,
    })

    res.json(createdArticle)
  } catch (err) {
    next(err)
  }
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
  try {
    const { id } = req.params
    const { title, content } = req.body

    if (title === undefined) {
      throw new BadRequest('no title provided!')
    }

    if (content === undefined) {
      throw new BadRequest('no content provided!')
    }

    const data = await ArticleModel.update({
      _id: id,
      title,
      content,
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

// Delete
async function delArticle(req, res, next) {
  try {
    const { id } = req.params
    const data = await ArticleModel.remove(id)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export { createArticle, getArticles, getArticle, delArticle, putArticle }
