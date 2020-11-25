import { Forbidden, Unauthorized } from '../utils/errors'
import config from '../config/auth.config'

const verifyJwtToken = (req, res, next) => {
  // get token from header
  const token = req['x-access-token']

  // return error if no token
  if (!token) throw new Forbidden('Token not exist!')

  // verify token if exist
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      throw new Unauthorized('Unauthorized!')
    }
    req.userId = decoded.id
    next()
  })
}
