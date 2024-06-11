import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
export class AuthController {
    authService = new AuthService();
    authSignUp = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            const authSignUp = await this.authService.authSignUp(email, password, name);
            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
                data: authSignUp
            })
        } catch (err) {
            next(err);
        }
    }
    authSignIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const authSignIn = await this.authService.authSignIn(email, password);
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
                data: authSignIn
            });
        } catch (error) {
            next(error);
        }
    }
}