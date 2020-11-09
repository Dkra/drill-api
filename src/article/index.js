import { Router } from 'express'
import { createArticle, putArticle, getArticle, delArticle } from './controller'
const router = Router()

router
  .post('/', createArticle)
  .get('/:id', getArticle)
  .put('/:id', putArticle)
  .delete('/:id', delArticle)

module.exports = router
