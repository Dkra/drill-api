const express = require('express')
const router = express.Router()
import { login as loginController } from '../controllers/user.controller'
import { signUp as signupController } from '../controllers/auth.controller'

router.post('/signup', signupController)
router.post('/login', loginController)

export default router
