import { Request, Response } from "express";
import { ListServiceUseCase } from "./ListServiceUseCase";

export class ListServiceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listServiceUseCase = new ListServiceUseCase();
    const all = await listServiceUseCase.execute();

    return response.json(all);
  }
}
