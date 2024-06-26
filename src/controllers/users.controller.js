import { UserRepository } from '../repositories/users.repository.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
export class UsersController {
    userRepository = new UserRepository();
    getMyInfo = async (req, res, next) => {
        try {
            const data = req.user;
            const getMyInfo = await this.userRepository.getMyInfo(data.email);
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.USERS.READ_ME.SUCCEED,
                data: getMyInfo
            });
        } catch (err) {
            next(err);
        }
    }
}