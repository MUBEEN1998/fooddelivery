import  express from "express";

import { login, usersignup } from "../controller/usercontroler.js";

const router=express.Router();

router.post('/signup',usersignup)
router.post('/login',login)

export default router;


