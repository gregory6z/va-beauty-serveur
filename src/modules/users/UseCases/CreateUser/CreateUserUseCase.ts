import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  telephone: string;
}

export class CreateUserUseCase {
  async execute({ name, email, password, telephone }: ICreateUser) {
    const userAlreadyExist = await prisma.users.findFirst({
      where: {
        email: {
          mode: "insensitive",
          equals: email,
        },
      },
    });
    if (userAlreadyExist) {
      throw new AppError("User already exists");
    }

    const hashPassword = await hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
        telephone,
      },
    });

    return user;
  }
}
