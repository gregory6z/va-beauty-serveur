import { ListCategoriesUseCase } from "./ListCategoryUseCase";
import { Request, Response } from "express";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = new ListCategoriesUseCase();
    const all = await listCategoriesUseCase.execute();

    return response.json(all);
  }
}
