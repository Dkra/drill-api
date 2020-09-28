import {
  Router
} from 'express';
import {createArticle, getArticles, getArticle, delArticle} from './controller'
const router = Router();

router.post('/', createArticle)
  .get('/', getArticles)
  .get('/:id', getArticle)
  .delete('/:id', delArticle)

module.exports = router;