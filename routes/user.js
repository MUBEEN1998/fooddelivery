import  express from "express";

import { login, usersignup,forgotpassword, usersInformation } from "../controller/usercontroler.js";

const router=express.Router();

router.post('/signup',usersignup)
router.post('/login',login)
router.post('/forgotpassword',forgotpassword)
router.get('/alluser',usersInformation)

export default router;


