import  express from "express";

import { login, usersignup,forgotpassword } from "../controller/usercontroler.js";

const router=express.Router();

router.post('/signup',usersignup)
router.post('/login',login)
router.post('/forgotpassword',forgotpassword)

export default router;


