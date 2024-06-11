import { UserRepository } from '../repositories/users.repository.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {
    userRepository = new UserRepository();

    authSignUp = async (email, password, name) => {
        const emailExisted = userRepository.getEmail(email);
        if (emailExisted) throw new BadRequest('이메일 이미 있음');

        const user = userRepository.authSignUp(email, password, name);

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
        const emailExisted = userRepository.getEmail(email);
        if (!emailExisted || !bcrypt.compareSync(password, emailExisted.password)) {
            throw new BadRequest('사용자 정보 틀림');
        }

        const accessToken = jwt.sign(
            payload = {
                id: user.id
            },
            ENV_KEY.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '12h',
            });


        // 로그인은 repository가 필요없다고 생각
        // const user = userRepository.authSignIn(email, password);


        return {
            data: { accessToken }
        }
    }
}