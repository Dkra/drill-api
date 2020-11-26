import bcrypt from 'bcrypt'
import { validatePassword, createAccessToken } from './auth.controller'
import { BadRequest } from '../utils/errors'
import UserModel from '../models/user.model'

export const login = async (req, res, next) => {
  try {
    // get required field
    const { email, password } = req.body

    // field is required
    if (!email || !password) {
      const field = []
      if (!email) field.push('email')
      if (!password) field.push('password')
      throw new BadRequest(`${field.join(' ,')} is required!`)
    }
    /* validate */

    // user existence
    const user = await UserModel.findOne({ email })
    if (!user) throw new BadRequest(`User not exist, please Sign-up!`)

    // password validility
    const isPasswordValid = await validatePassword(password, user.password)
    if (!isPasswordValid) throw new BadRequest(`Password is not correct!`)

    // make a jwt token
    const accessToken = createAccessToken(user._id)

    // update access token to DB
    await UserModel.findByIdAndUpdate(user._id, { accessToken })

    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
    })
  } catch (err) {
    next(err)
  }
}
