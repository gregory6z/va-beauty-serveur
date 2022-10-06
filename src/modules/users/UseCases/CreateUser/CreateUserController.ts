import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, telephone } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      name,
      email,
      password,
      telephone,
    });

    return response.status(201).send();
  }
}
