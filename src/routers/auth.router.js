import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
const authController = new AuthController();
// 회원가입
authRouter.post('/sign-up', signUpValidator, authController.authSignUp);

//로그인
authRouter.post('/sign-in', signInValidator, authController.authSignIn);

export { authRouter };
