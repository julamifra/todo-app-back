import { Response } from "express";
import { ErrorCodesTypes, ErrorResponse } from "../types";

export const handleHttp = (
  res: Response,
  errorCode: ErrorCodesTypes,
  errorMessage: string,
  code?: number
) => {
  console.error(errorMessage);
  return res
    .status(code ?? 500)
    .json({ errorCode, message: errorMessage } as ErrorResponse);
};
