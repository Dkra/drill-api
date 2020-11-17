import UserModel from '../models/user.model'
import RoleModel from '../models/role.model'
import { GeneralError, BadRequest } from '../utils/errors'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    await UserModel.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        throw new Error('err', err)
        return
      }

      if (user) {
        throw new BadRequest('Failed! Username is already taken!')
        return
      }
    })

    // Email
    await UserModel.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        throw new Error('err', err)
        return
      }

      if (user) {
        throw new BadRequest('Failed! Email is already taken!')
        return
      }
    })
    next()
  } catch (err) {
    next(err)
  }
}

// const checkRolesExisted = (req, res, next) => {
//     if(err)
//     next();
// };

// if (req.body.roles) {
//   for (let i = 0; i < req.body.roles.length; i++) {
//     if (!ROLES.includes(req.body.roles[i])) {
//       res.status(400).send({
//         message: `Failed! Role ${req.body.roles[i]} does not exist!`
//       });
//       return;
//     }
//   }
// }
