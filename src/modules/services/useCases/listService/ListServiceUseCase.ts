import { prisma } from "../../../../database/prismaClient";

export class ListServiceUseCase {
  async execute() {
    const services = await prisma.services.findMany({});

    return services;
  }
}
