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
      email,
      password: await hashPassword(password),
      role: role || 'user',
    })
    const accessToken = createAccessToken(newUser._id)
    newUser.accessToken = accessToken
    await newUser.save()

    res.json({
      data: newUser,
      accessToken,
    })
  } catch (err) {
    debugger
    console.log('err', err)
    next(err)
  }
}

export async function validatePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export function createAccessToken(userId) {
  return jwt.sign({ userId }, config.secret, {
    expiresIn: '1d',
  })
}
