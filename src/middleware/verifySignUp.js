import UserModel from '../models/user.model'
import RoleModel from '../models/role.model'
import { GeneralError, BadRequest } from '../utils/errors'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    debugger
    let isUsernameExist
    let isUserEmailExist
    const findByName = await UserModel.findOne(
      {
        username: req.body.username,
      },
      (err, user) => {
        debugger
        if (err) {
          //   throw new Error('err', err)
          return
        }

        if (user) {
          debugger
          isUsernameExist = true
          // Cannot throw here, will trigger Jest AfterAll execute in advacned
          // throw new BadRequest('Failed! Username is already taken!')
        }
      },
    )
    if (isUsernameExist)
      throw new BadRequest('Failed! Username is already taken!')

    debugger
    // Email
    const findByEmail = await UserModel.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        debugger
        if (err) {
          throw new Error('err', err)
          return
        }

        if (user) {
          debugger
          isUserEmailExist = true
          // Cannot throw here, will trigger Jest AfterAll execute in advacned
          //   throw new BadRequest('Failed! Username is already taken!')
        }
      },
    )
    if (isUserEmailExist)
      throw new BadRequest('Failed! Email is already taken!')
    debugger
    next()
  } catch (err) {
    console.log('err!!!!!!!!!!!!!!!!!!!!!', err)
    debugger
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
