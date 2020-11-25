import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequest } from '../utils/errors'
import { checkDuplicateEmail } from '../middleware/verifySignUp'
import UserModel from '../models/user.model'
import config from '../config/auth.config'

export const signUp = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    // field is required
    if (!email || !password) {
      const field = []
      if (!email) field.push('email')
      if (!password) field.push('password')
      throw new BadRequest(`${field.join(' ,')} is required!`)
    }
    // check if email exist
    await checkDuplicateEmail(req, res, next)

    // if not, save user to db
    const newUser = new UserModel({
      email: email,
      password: bcrypt.hashSync(password, 8),
      role: role || 'user',
    })

    const accessToken = jwt.sign({ userId: newUser._id }, config.secret, {
      expiresIn: '1d',
    })
    newUser.accessToken = accessToken
    await newUser.save()

    res.json({
      data: newUser,
      accessToken,
    })
  } catch (err) {
    console.log('err', err)
    next(err)
  }
}

export const signIn = (req, res) => {}
