import { Request, Response } from "express";
import { CreateServiceUseCase } from "./CreateServiceUseCase";

export class CreateServiceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, time, services_header_id, descriptions } =
      request.body;

    const createServiceUseCase = new CreateServiceUseCase();
    const result = await createServiceUseCase.execute({
      name,
      services_header_id,
      price,
      time,
      descriptions,
    });

    return response.json(result);
  }
}
