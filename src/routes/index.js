const express = require('express')
const router = express.Router()
import { login as loginController } from '../controllers/user.controller'
import { signUp as signupController } from '../controllers/auth.controller'
import { checkDuplicateEmail } from '../middleware/verifySignUp'

router.post('/signup', [checkDuplicateEmail], signupController)
router.post('/login', loginController)

export default router
