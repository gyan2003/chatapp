import express from 'express'
import { loginController,signupController,logoutController } from '../controller/authController.js';
const router=express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);


export default router