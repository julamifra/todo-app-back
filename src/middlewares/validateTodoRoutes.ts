import { NextFunction, Request, Response } from "express";
import { isGreater255Length, isString } from "../utils/validations";
import { BodyCreateTodo, BodyUpdateTodo, ERROR_CODES } from "../types";
import { handleHttp } from "../utils/error.handle";

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req?.body as BodyCreateTodo;
  if (!body) {
    return handleHttp(
      res,
      ERROR_CODES.ERROR_POST_VALIDATE,
      "Request must have a body",
      400
    );
  }
  if (!body.name) {
    return handleHttp(
      res,
      ERROR_CODES.ERROR_POST_VALIDATE,
      'Body must have a "name" field',
      400
    );
  }

  if (!isString(body.name)) {
    return handleHttp(
      res,
      ERROR_CODES.ERROR_POST_VALIDATE,
      '"name" field must be of type string',
      400
    );
  }
  if (isGreater255Length(body.name)) {
    return handleHttp(
      res,
      ERROR_CODES.ERROR_POST_VALIDATE,
      '"name" is greater than 255 characters',
      400
    );
  }
  return next();
};

export const validatePut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newName, newCompleted } = req.body as BodyUpdateTodo;

  if (
    (newName && typeof newName === "string") ||
    (req.body.hasOwnProperty("newCompleted") &&
      typeof newCompleted === "boolean")
  ) {
    return next();
  }
  return handleHttp(
    res,
    ERROR_CODES.ERROR_PUT_VALIDATE,
    "Incorrect body params",
    400
  );
};
