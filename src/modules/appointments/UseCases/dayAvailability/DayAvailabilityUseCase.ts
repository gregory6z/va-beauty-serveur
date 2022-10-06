import { getDate, getHours, getMonth, getYear, isAfter } from "date-fns";
import moment from "moment";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  day: number;
  month: number;
  year: number;
}

export class DayAvailabilityUseCase {
  async execute({ day, month, year }: IRequest) {
    const parseDay = String(day).padStart(2, "0");
    const parseMonth = String(month).padStart(2, "0");

    const dateFilter = `${year}-${parseMonth}-${parseDay}`;

    const appointments = await prisma.appointments.findMany({
      where: {
        date: {
          gte: moment.utc(dateFilter).toISOString(),
          lt: moment.utc(dateFilter).add(1, "day").toISOString(),
        },
      },
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 13 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
