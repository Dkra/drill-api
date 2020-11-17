import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequest } from '../utils/errors'
import { checkDuplicateUsernameOrEmail } from '../middleware/verifySignUp'
import UserModel from '../models/user.model'

export const signUp = (req, res, next) => {
  try {
    const { username, email, password } = req.body

    // field is required
    if (!username || !email || !password) {
      const field = []
      if (!username) field.push('username')
      if (!email) field.push('email')
      if (!password) field.push('password')
      throw new BadRequest(`${field.join(' ,')} is required!`)
    }
    // check if username, email exist
    checkDuplicateUsernameOrEmail(req, res, next)

    // if not, save user to db
    const newUser = new UserModel({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    })

    newUser.save((err, user) => {
      if (err) {
        throw new Error(err)
        return
      }

      res.send({ message: 'User was registered successfully!' })
    })
  } catch (err) {
    next(err)
  }
}

export const signIn = (req, res) => {}
