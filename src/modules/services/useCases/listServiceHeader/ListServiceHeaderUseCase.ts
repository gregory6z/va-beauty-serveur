import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  category: string;
}

export class ListServiceHeaderUseCase {
  async execute({ category }: IRequest) {
    const services = await prisma.services_Header.findMany({
      where: {
        category_id: category,
      },
      include: {
        Services: true,
      },
    });

    console.log(services);

    return services;
  }
}
