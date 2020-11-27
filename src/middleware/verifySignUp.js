import UserModel from '../models/user.model'
import { BadRequest } from '../utils/errors'

export const checkDuplicateEmail = async (req, res, next) => {
  try {
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
    const findByEmail = await UserModel.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          throw new Error('err', err)
          return
        }

        if (user) {
          isUserEmailExist = true
          // Cannot throw here, will trigger Jest AfterAll execute in advacned
          //   throw new BadRequest('Failed! Username is already taken!')
        }
      },
    )
    if (isUserEmailExist)
      throw new BadRequest('Failed! Email is already taken!')
    next()
  } catch (err) {
    next(err)
  }
}
