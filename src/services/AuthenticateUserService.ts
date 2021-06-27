import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({ email });

        if (!user) {
            throw new Error("Email/password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/password incorrect");
        }

        const token = sign({
            email: user.email,
            name: user.name
        }, "15453309273f77a61f9cb5bb2a1aa3de", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}

export { AuthenticateUserService };