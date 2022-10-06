import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  descriptions: [];
  price: number;
  time: number;
  services_header_id: string;
}

export class CreateServiceUseCase {
  async execute({
    name,
    price,
    time,
    services_header_id,
    descriptions,
  }: IRequest) {
    const categoryAlreadyExists = await prisma.services.findFirst({
      where: { name },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Service already exists");
    }

    const service = await prisma.services.create({
      data: { name, price, time, services_header_id, descriptions },
    });

    return service;
  }
}
