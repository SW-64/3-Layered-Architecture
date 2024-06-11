import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

import { UsersController } from '../controllers/users.controller.js';
const usersRouter = express.Router();
// UsersController라는 생성자 함수를 호출하여 usercontroller라는 객체 생성
const usercontroller = new UsersController();

usersRouter.get('/me', requireAccessToken, usercontroller.getMyInfo)

export { usersRouter };
