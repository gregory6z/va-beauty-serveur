import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
}

export class CreateCategoryUseCase {
  async execute({ name }: IRequest) {
    const categoryAlreadyExists = await prisma.categories.findFirst({
      where: { name },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    const category = prisma.categories.create({ data: { name } });

    return category;
  }
}
