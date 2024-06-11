import { prisma } from '../utils/prisma.util.js';
import { HASHROUNDS } from '../constants/env.constant.js';
import bcrypt from 'bcrypt';
export class UserRepository {
    getMyInfo = async (email) => {
        const user = await prisma.user.findUnique({
            where: { email: email },
        })
        return user;
    };
    authSignUp = async (email, password, name) => {
        const hashedPassword = bcrypt.hashSync(password, +HASHROUNDS);
        const { password: _, ...user } = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }

        })
        return user;
    }
}