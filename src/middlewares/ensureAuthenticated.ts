import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, String(process.env.JWT_CLIENTS_SECRET));
    if (sub && typeof sub === "string") {
      request.user.id = sub;
    }

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
