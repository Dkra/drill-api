import UserModel from '../models/user.model'
import { BadRequest } from '../utils/errors'

export const checkDuplicateEmail = async (req, res, next) => {
  const { email, password } = req.body

  // Username
  let isUserEmailExist

  // field is required
  if (!email || !password) {
    const field = []
    if (!email) field.push('email')
    if (!password) field.push('password')
    throw new BadRequest(`${field.join(' ,')} is required!`)
  }

  // Email
  const findByEmail = await UserModel.findOne({
    email: req.body.email,
  }).exec()

  if (findByEmail) throw new BadRequest('Failed! Email is already taken!')
}
