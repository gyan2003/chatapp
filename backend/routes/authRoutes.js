import express from 'express'
import { loginController,signupController,logoutController } from '../controller/authController.js';
const router=express.Router();

router.get('/login',loginController);
router.get('/signup',signupController);
router.get('/logout',logoutController);


export default router