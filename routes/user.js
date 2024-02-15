import  express from "express";

import { usersignup } from "../controller/usercontroler.js";

const router=express.Router();

router.post('/signup',usersignup)

export default router;


