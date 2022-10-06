import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  id?: string;
  name: string;
  after_img?: string;
  before_img?: string;
  category_id: string;
}

export class CreateServiceHeaderUseCase {
  async execute({ id, name, after_img, before_img, category_id }: IRequest) {
    // const categoryAlreadyExists = await prisma.services_Header.findFirst({
    //   where: { id },
    // });

    // if (categoryAlreadyExists ) {
    //   throw new AppError("Service already exists");
    // }

    const serviceHeader = await prisma.services_Header.create({
      data: { name, after_img, before_img, category_id },
    });

    return serviceHeader;
  }
}
