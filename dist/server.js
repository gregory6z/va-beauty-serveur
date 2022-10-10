"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");

// src/routes.ts
var import_express = require("express");

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/users/UseCases/AuthenticateUser/AuthenticateUserUseCase.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_bcrypt = require("bcrypt");
var AuthenticateUserUseCase = class {
  async execute({ email, password }) {
    const user = await prisma.users.findFirst({
      where: { email }
    });
    const name = user == null ? void 0 : user.name;
    if (!user) {
      throw new AppError("Email or password invalid!");
    }
    const passwordMatch = await (0, import_bcrypt.compare)(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password invalid!");
    }
    const token = (0, import_jsonwebtoken.sign)({ name }, "edec1bf8c2444fa3a255f798421c11fd", {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION
    });
    return { token, name, id: user.id };
  }
};

// src/modules/users/UseCases/AuthenticateUser/AuthenticateUserController.ts
var AuthenticateUserController = class {
  async handle(request, response) {
    const { email, password } = request.body;
    const authenticateUserUseCase = new AuthenticateUserUseCase();
    const token = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.json(token);
  }
};

// src/modules/services/useCases/createCategory/CreateCategoryUseCase.ts
var CreateCategoryUseCase = class {
  async execute({ name }) {
    const categoryAlreadyExists = await prisma.categories.findFirst({
      where: { name }
    });
    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }
    const category = prisma.categories.create({ data: { name } });
    return category;
  }
};

// src/modules/services/useCases/createCategory/CreateCategoryController.ts
var CreateCategoryController = class {
  async handle(request, response) {
    const { name } = request.body;
    const createCategoryUseCase = new CreateCategoryUseCase();
    const result = await createCategoryUseCase.execute({
      name
    });
    return response.json(result);
  }
};

// src/modules/users/UseCases/CreateUser/CreateUserUseCase.ts
var import_bcrypt2 = require("bcrypt");
var CreateUserUseCase = class {
  async execute({ name, email, password, telephone }) {
    const userAlreadyExist = await prisma.users.findFirst({
      where: {
        email: {
          mode: "insensitive",
          equals: email
        }
      }
    });
    if (userAlreadyExist) {
      throw new AppError("User already exists");
    }
    const hashPassword = await (0, import_bcrypt2.hash)(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
        telephone
      }
    });
    return user;
  }
};

// src/modules/users/UseCases/CreateUser/CreateUserController.ts
var CreateUserController = class {
  async handle(request, response) {
    const { name, password, email, telephone } = request.body;
    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({
      name,
      email,
      password,
      telephone
    });
    return response.status(201).send();
  }
};

// src/modules/services/useCases/createService/CreateServiceUseCase.ts
var CreateServiceUseCase = class {
  async execute({
    name,
    price,
    time,
    services_header_id,
    descriptions
  }) {
    const categoryAlreadyExists = await prisma.services.findFirst({
      where: { name }
    });
    if (categoryAlreadyExists) {
      throw new AppError("Service already exists");
    }
    const service = await prisma.services.create({
      data: { name, price, time, services_header_id, descriptions }
    });
    return service;
  }
};

// src/modules/services/useCases/createService/CreateServiceController.ts
var CreateServiceController = class {
  async handle(request, response) {
    const { name, price, time, services_header_id, descriptions } = request.body;
    const createServiceUseCase = new CreateServiceUseCase();
    const result = await createServiceUseCase.execute({
      name,
      services_header_id,
      price,
      time,
      descriptions
    });
    return response.json(result);
  }
};

// src/modules/services/useCases/listCategory/ListCategoryUseCase.ts
var ListCategoriesUseCase = class {
  async execute() {
    const categories = await prisma.categories.findMany({
      include: { service_header: true }
    });
    return categories;
  }
};

// src/modules/services/useCases/listCategory/ListCategoryController.ts
var ListCategoriesController = class {
  async handle(request, response) {
    const listCategoriesUseCase = new ListCategoriesUseCase();
    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }
};

// src/modules/services/useCases/listService/ListServiceUseCase.ts
var ListServiceUseCase = class {
  async execute() {
    const services = await prisma.services.findMany({});
    return services;
  }
};

// src/modules/services/useCases/listService/ListServiceController.ts
var ListServiceController = class {
  async handle(request, response) {
    const listServiceUseCase = new ListServiceUseCase();
    const all = await listServiceUseCase.execute();
    return response.json(all);
  }
};

// src/modules/appointments/UseCases/createAppointment/CreateAppointmentUseCase.ts
var import_date_fns = require("date-fns");
var CreateAppointmentUseCase = class {
  async execute({ date, user_id, service_id }) {
    const appointmentDate = date;
    console.log(appointmentDate);
    if ((0, import_date_fns.isBefore)(appointmentDate, Date.now())) {
      throw new AppError("you can't create an appointment on a past date");
    }
    if ((0, import_date_fns.getHours)(appointmentDate) < 9 || (0, import_date_fns.getHours)(appointmentDate) > 20) {
      throw new AppError("you can only an appointment between 9am and 20pm");
    }
    const findAppointmentInSameDate = await prisma.appointments.findFirst({
      where: {
        date
      }
    });
    if (findAppointmentInSameDate) {
      throw new AppError("this appointment is already booked");
    }
    const appointment = await prisma.appointments.create({
      data: {
        service_id,
        user_id,
        date: appointmentDate
      }
    });
    return appointment;
  }
};

// src/modules/appointments/UseCases/createAppointment/CreateAppointmentController.ts
var CreateAppointmentController = class {
  async handle(request, response) {
    const { service_id, date, user_id } = request.body;
    const createAppointmentUseCase = new CreateAppointmentUseCase();
    const result = await createAppointmentUseCase.execute({
      service_id,
      user_id,
      date
    });
    return response.json(result);
  }
};

// src/modules/appointments/UseCases/monthAvailability/MonthAvailabilityUseCase.ts
var import_date_fns2 = require("date-fns");
var import_moment = __toESM(require("moment"));
var MonthAvailabilityUseCase = class {
  async execute({ year, month }) {
    const startMonth = (0, import_date_fns2.startOfMonth)(new Date(year, month, 1, 0, 0, 0));
    const endMonth = (0, import_date_fns2.endOfMonth)(new Date(year, month, 1, 0, 0, 0));
    const appointments = await prisma.appointments.findMany({
      where: {
        date: {
          gte: import_moment.default.utc(startMonth).toISOString(),
          lt: import_moment.default.utc(endMonth).toISOString()
        }
      }
    });
    const numberOfDaysInMonth = (0, import_date_fns2.getDaysInMonth)(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );
    const availability = eachDayArray.map((day) => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentsInDay = appointments.filter((appointment) => {
        return (0, import_date_fns2.getDate)(appointment.date) === day;
      });
      return {
        day,
        available: (0, import_date_fns2.isAfter)(compareDate, new Date()) && appointmentsInDay.length < 13
      };
    });
    return availability;
  }
};

// src/modules/appointments/UseCases/monthAvailability/MonthAvailabilityController.ts
var MonthAvailabilityController = class {
  async handle(request, response) {
    const { month, year } = request.query;
    const monthAvailabilityUseCase = new MonthAvailabilityUseCase();
    const result = await monthAvailabilityUseCase.execute({
      month: Number(month),
      year: Number(year)
    });
    return response.json(result);
  }
};

// src/modules/appointments/UseCases/dayAvailability/DayAvailabilityUseCase.ts
var import_date_fns3 = require("date-fns");
var import_moment2 = __toESM(require("moment"));
var DayAvailabilityUseCase = class {
  async execute({ day, month, year }) {
    const parseDay = String(day).padStart(2, "0");
    const parseMonth = String(month).padStart(2, "0");
    const dateFilter = `${year}-${parseMonth}-${parseDay}`;
    const appointments = await prisma.appointments.findMany({
      where: {
        date: {
          gte: import_moment2.default.utc(dateFilter).toISOString(),
          lt: import_moment2.default.utc(dateFilter).add(1, "day").toISOString()
        }
      }
    });
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 13 },
      (_, index) => index + hourStart
    );
    const currentDate = new Date(Date.now());
    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => (0, import_date_fns3.getHours)(appointment.date) === hour
      );
      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppointmentInHour && (0, import_date_fns3.isAfter)(compareDate, currentDate)
      };
    });
    return availability;
  }
};

// src/modules/appointments/UseCases/dayAvailability/DayAvailabilityController.ts
var DayAvailabilityController = class {
  async handle(request, response) {
    const { month, year, day } = request.query;
    const dayAvailabilityUseCase = new DayAvailabilityUseCase();
    const result = await dayAvailabilityUseCase.execute({
      month: Number(month),
      year: Number(year),
      day: Number(day)
    });
    return response.json(result);
  }
};

// src/modules/services/useCases/createServiceHeader/CreateServiceHeaderUseCase.ts
var CreateServiceHeaderUseCase = class {
  async execute({ id, name, after_img, before_img, category_id }) {
    const serviceHeader = await prisma.services_Header.create({
      data: { name, after_img, before_img, category_id }
    });
    return serviceHeader;
  }
};

// src/modules/services/useCases/createServiceHeader/CreateServiceHeaderController.ts
var CreateServiceHeaderController = class {
  async handle(request, response) {
    const { name, after_img, before_img, category_id } = request.body;
    const createSpecificationUseCase = new CreateServiceHeaderUseCase();
    const result = await createSpecificationUseCase.execute({
      name,
      after_img,
      before_img,
      category_id
    });
    return response.json(result);
  }
};

// src/modules/services/useCases/listServiceHeader/ListServiceHeaderUseCase.ts
var ListServiceHeaderUseCase = class {
  async execute({ category }) {
    const services = await prisma.services_Header.findMany({
      where: {
        category_id: category
      },
      include: {
        Services: true
      }
    });
    console.log(services);
    return services;
  }
};

// src/modules/services/useCases/listServiceHeader/ListServiceHeaderController.ts
var ListServiceHeaderController = class {
  async handle(request, response) {
    const { category } = request.query;
    const listServiceUseCase = new ListServiceHeaderUseCase();
    const result = await listServiceUseCase.execute({
      category: String(category)
    });
    return response.json(result);
  }
};

// src/routes.ts
var routes = (0, import_express.Router)();
var createUserController = new CreateUserController();
var authenticateUserController = new AuthenticateUserController();
var createCategoryController = new CreateCategoryController();
var createServiceController = new CreateServiceController();
var listCategoriesController = new ListCategoriesController();
var listServiceController = new ListServiceController();
var createServiceHeaderController = new CreateServiceHeaderController();
var listServiceHeaderController = new ListServiceHeaderController();
var createAppointmentController = new CreateAppointmentController();
var monthAvailabilityController = new MonthAvailabilityController();
var dayAvailabilityController = new DayAvailabilityController();
routes.post("/user", createUserController.handle);
routes.post("/authenticate", authenticateUserController.handle);
routes.post("/categories", createCategoryController.handle);
routes.get("/categories", listCategoriesController.handle);
routes.post("/services", createServiceController.handle);
routes.get("/services", listServiceController.handle);
routes.post("/service-header", createServiceHeaderController.handle);
routes.get("/service-header", listServiceHeaderController.handle);
routes.post("/appointment", createAppointmentController.handle);
routes.get("/appointment/month", monthAvailabilityController.handle);
routes.get("/appointment/day", dayAvailabilityController.handle);

// src/server.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use(routes);
app.use(
  (err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`
    });
  }
);
app.listen(process.env.PORT || 3333, () => console.log("Server is running"));
