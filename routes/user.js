import  express from "express";

import { login, usersignup,forgotpassword, usersInformation,userupdate } from "../controller/usercontroler.js";
import { checktoken,checkrole } from "../middeware/authenticationmiddleware.js";

const router=express.Router();

router.post('/signup',usersignup)
router.post('/login',login)
router.post('/forgotpassword',forgotpassword)
router.get('/alluser',checktoken,usersInformation)
router.put('/userinformation',checktoken,userupdate)

export default router;


