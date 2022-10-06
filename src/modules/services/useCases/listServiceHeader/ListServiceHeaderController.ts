import { Request, Response } from "express";
import { ListServiceHeaderUseCase } from "./ListServiceHeaderUseCase";

export class ListServiceHeaderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category } = request.query;

    const listServiceUseCase = new ListServiceHeaderUseCase();
    const result = await listServiceUseCase.execute({
      category: String(category),
    });

    return response.json(result);
  }
}
