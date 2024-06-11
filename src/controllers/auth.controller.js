import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
export class AuthController {
    authService = new AuthService();

    authSignUp = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            const authSignUp = authService.authSignUp(email, password, name);

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

            const authSignIn = authService.authSignIn(email, password);
            /*
            const user = await prisma.user.findUnique({ where: { email } });

            const isPasswordMatched =
                user && bcrypt.compareSync(password, user.password);

            if (!isPasswordMatched) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    status: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
                });
            }

            const payload = { id: user.id };

            const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRES_IN,
            });
            */
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