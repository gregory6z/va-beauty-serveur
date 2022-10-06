import { isBefore, getHours, startOfHour } from "date-fns";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  date: Date;
  user_id: string;
  service_id: string;
}
export class CreateAppointmentUseCase {
  async execute({ date, user_id, service_id }: IRequest) {
    const appointmentDate = date;

    console.log(appointmentDate);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("you can't create an appointment on a past date");
    }

    if (getHours(appointmentDate) < 9 || getHours(appointmentDate) > 20) {
      throw new AppError("you can only an appointment between 9am and 20pm");
    }

    const findAppointmentInSameDate = await prisma.appointments.findFirst({
      where: {
        date,
      },
    });

    if (findAppointmentInSameDate) {
      throw new AppError("this appointment is already booked");
    }

    const appointment = await prisma.appointments.create({
      data: {
        service_id,
        user_id,
        date: appointmentDate,
      },
    });

    return appointment;
  }
}
