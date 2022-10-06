import {
  getDate,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  isAfter,
} from "date-fns";
import moment from "moment";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  month: number;
  year: number;
}

export class MonthAvailabilityUseCase {
  async execute({ year, month }: IRequest) {
    const startMonth = startOfMonth(new Date(year, month, 1, 0, 0, 0));
    const endMonth = endOfMonth(new Date(year, month, 1, 0, 0, 0));

    const appointments = await prisma.appointments.findMany({
      where: {
        date: {
          gte: moment.utc(startMonth).toISOString(),
          lt: moment.utc(endMonth).toISOString(),
        },
      },
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map((day) => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 13,
      };
    });

    return availability;
  }
}
