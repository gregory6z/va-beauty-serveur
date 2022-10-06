import { prisma } from "../../../../database/prismaClient";

export class ListCategoriesUseCase {
  async execute() {
    const categories = await prisma.categories.findMany({
      include: { service_header: true },
    });

    return categories;
  }
}
