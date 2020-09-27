import {
  Router
} from 'express';
const router = Router();

router.get('/', function (req, res) {
  res.send('all articles!!!');
})

module.exports = router;