import { Request, Response } from "express";
import { CreateServiceHeaderUseCase } from "./CreateServiceHeaderUseCase";

export class CreateServiceHeaderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, after_img, before_img, category_id } = request.body;

    const createSpecificationUseCase = new CreateServiceHeaderUseCase();

    const result = await createSpecificationUseCase.execute({
      name,
      after_img,
      before_img,
      category_id,
    });

    return response.json(result);
  }
}
