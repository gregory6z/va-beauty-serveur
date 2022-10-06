import { Request, Response } from "express";
import { format, parseISO } from "date-fns";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";
("date-fns");

export class CreateAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { service_id, date, user_id } = request.body;

    // const parsedDate = parseISO(date);

    const createAppointmentUseCase = new CreateAppointmentUseCase();
    const result = await createAppointmentUseCase.execute({
      service_id,
      user_id,
      date,
    });

    return response.json(result);
  }
}
