import { Request, Response } from "express";
import { DayAvailabilityUseCase } from "./DayAvailabilityUseCase";

export class DayAvailabilityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;

    const dayAvailabilityUseCase = new DayAvailabilityUseCase();
    
    const result = await dayAvailabilityUseCase.execute({
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(result);
  }
}
