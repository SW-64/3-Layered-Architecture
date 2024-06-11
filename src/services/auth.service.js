import { UserRepository } from '../repositories/users.repository.js'
import { HttpError } from '../errors/http.error.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {

    userRepository = new UserRepository();

    authSignUp = async (email, password, name) => {
        const emailExisted = await this.userRepository.getMyInfo(email);
        if (emailExisted) throw new HttpError.BadRequest('이메일 이미 있음');
        const user = await this.userRepository.authSignUp(email, password, name);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.name,
            created_at: user.created_at,
            updated_at: user.updatead_at
        }
    }
    authSignIn = async (email, password) => {
        const emailExisted = await this.userRepository.getMyInfo(email);
        if (!emailExisted || !bcrypt.compareSync(password, emailExisted.password)) {
            throw new HttpError.BadRequest('사용자 정보 틀림');
        }
        const payload = { id: emailExisted.id };
        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_SECRET,
            { expiresIn: '12h', });
        // 로그인은 repository가 필요없다고 생각
        return {
            data: { accessToken }
        }
    }
}