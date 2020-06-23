import express from "express"
import passport from "passport"
const router = express.Router()

import userControl from "../controller/userControl"

//user registration
router.post('/register',userControl.register)

//user login

router.post('/login',userControl.login)

module.exports = router