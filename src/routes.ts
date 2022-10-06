import { MonthAvailabilityUseCase } from "./modules/appointments/UseCases/monthAvailability/MonthAvailabilityUseCase";
import { Router } from "express";
import { AuthenticateUserController } from "./modules/users/UseCases/AuthenticateUser/AuthenticateUserController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateCategoryController } from "./modules/services/useCases/createCategory/CreateCategoryController";
import { CreateUserController } from "./modules/users/UseCases/CreateUser/CreateUserController";
import { CreateServiceController } from "./modules/services/useCases/createService/CreateServiceController";
import { ListCategoriesController } from "./modules/services/useCases/listCategory/ListCategoryController";
import { ListServiceController } from "./modules/services/useCases/listService/ListServiceController";

import { CreateAppointmentController } from "./modules/appointments/UseCases/createAppointment/CreateAppointmentController";
import { MonthAvailabilityController } from "./modules/appointments/UseCases/monthAvailability/MonthAvailabilityController";
import { DayAvailabilityController } from "./modules/appointments/UseCases/dayAvailability/DayAvailabilityController";
import { CreateServiceHeaderController } from "./modules/services/useCases/createServiceHeader/CreateServiceHeaderController";
import { ListServiceHeaderController } from "./modules/services/useCases/listServiceHeader/ListServiceHeaderController";

export const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createCategoryController = new CreateCategoryController();
const createServiceController = new CreateServiceController();
const listCategoriesController = new ListCategoriesController();
const listServiceController = new ListServiceController();
const createServiceHeaderController = new CreateServiceHeaderController();
const listServiceHeaderController = new ListServiceHeaderController();
const createAppointmentController = new CreateAppointmentController();
const monthAvailabilityController = new MonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();

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
