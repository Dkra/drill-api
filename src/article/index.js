import {
  Router
} from 'express';
import {
  createArticle,
  putArticle,
  getArticles,
  getArticle,
  delArticle
} from './controller'
const router = Router();

router.post('/', createArticle)
  .get('/', getArticles)
  .get('/:id', getArticle)
  .put('/:id', putArticle)
  .delete('/:id', delArticle)

module.exports = router;