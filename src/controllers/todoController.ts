import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import * as todoModels from "../services/todoServices";
import { BodyCreateTodo, BodyUpdateTodo, ERROR_CODES } from "../types";

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await todoModels.getTodos();
    res.send(todos);
  } catch (e) {
    handleHttp(res, ERROR_CODES.ERROR_GET_TODOS, (e as Error).message);
  }
};

export const postTodos = async (req: Request, res: Response) => {
  try {
    const { name } = req.body as BodyCreateTodo;
    const addedTodo = await todoModels.addTodo({ name });
    res.status(201).json(addedTodo);
  } catch (e) {
    handleHttp(res, ERROR_CODES.ERROR_POST_TODOS, (e as Error).message);
  }
};

export const putTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newName, newCompleted } = req.body as BodyUpdateTodo;
    const dbResponse = await todoModels.updateTodo({
      id: parseInt(id),
      newName,
      newCompleted,
    });
    if (dbResponse.rowCount === 0) {
      return handleHttp(
        res,
        ERROR_CODES.ERROR_PUT_TODOS_NOT_FOUND,
        "Todo not found",
        404
      );
    }
    return res.sendStatus(204);
  } catch (e) {
    return handleHttp(res, ERROR_CODES.ERROR_PUT_TODOS, (e as Error).message);
  }
};

export const deleteTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    const dbResponse = await todoModels.deleteTodo(idNum);
    if (dbResponse.rowCount === 0) {
      return handleHttp(
        res,
        ERROR_CODES.ERROR_DELETE_TODOS_NOT_FOUND,
        "Todo not found",
        404
      );
    }
    return res.sendStatus(204);
  } catch (e) {
    return handleHttp(
      res,
      ERROR_CODES.ERROR_DELETE_TODOS,
      (e as Error).message
    );
  }
};
