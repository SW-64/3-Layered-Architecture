import { prisma } from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';
export class UserRepository {
    getMyInfo = async (data) => {
        const MyInfo = await prisma.users.findUnique({
            email: +email
        })

        return MyInfo;
    };
    authSignUp = async (email, password, name) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const { password: _, ...user } = await prisma.users.create({
            email,
            password: hashedPassword,
            name
        })


        return user;
    }

    getEmail = async (email) => {
        const user = await prisma.users.findUnique({
            email: +email,
        })
        return user;
    }

    //     authSignIn = async (email, password) => {

    //     }
}