import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategoryUseCase = new CreateCategoryUseCase();
    const result = await createCategoryUseCase.execute({
      name,
    });

    return response.json(result);
  }
}
