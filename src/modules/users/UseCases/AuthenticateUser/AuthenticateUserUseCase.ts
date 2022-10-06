import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

import { sign } from "jsonwebtoken";

import { compare } from "bcrypt";

interface IAuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    const name = user?.name;

    if (!user) {
      throw new AppError("Email or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid!");
    }

    const token = sign({ name }, "edec1bf8c2444fa3a255f798421c11fd", {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return { token, name, id: user.id };
  }
}
