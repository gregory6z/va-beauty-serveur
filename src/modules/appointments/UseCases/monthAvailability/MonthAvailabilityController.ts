import { MonthAvailabilityUseCase } from "./MonthAvailabilityUseCase";
import { Request, Response } from "express";

export class MonthAvailabilityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;

    const monthAvailabilityUseCase = new MonthAvailabilityUseCase();
    const result = await monthAvailabilityUseCase.execute({
      month: Number(month),
      year: Number(year),
    });

    return response.json(result);
  }
}
