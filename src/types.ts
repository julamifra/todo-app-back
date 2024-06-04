export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

export type NameTodo = Pick<Todo, "name">;
export type IdTodo = Pick<Todo, "id">;
export type CompletedTodo = Pick<Todo, "id">;

export type UpdateTodo = {
  id: number;
  newName: string | null;
  newCompleted: boolean | null;
};

export type BodyCreateTodo = {
  name: string;
};

export type BodyUpdateTodo = {
  newName: string;
  newCompleted: boolean;
};

export interface ErrorResponse {
  errorCode: ErrorCodesTypes;
  message: string;
}

export const ERROR_CODES = {
  ERROR_POST_VALIDATE: "ERROR_POST_VALIDATE",
  ERROR_PUT_VALIDATE: "ERROR_PUT_VALIDATE",
  ERROR_GET_TODOS: "ERROR_GET_TODOS",
  ERROR_POST_TODOS: "ERROR_POST_TODOS",
  ERROR_PUT_TODOS_NOT_FOUND: "ERROR_PUT_TODOS_NOT_FOUND",
  ERROR_PUT_TODOS: "ERROR_PUT_TODOS",
  ERROR_DELETE_TODOS_NOT_FOUND: "ERROR_DELETE_TODOS_NOT_FOUND",
  ERROR_DELETE_TODOS: "ERROR_DELETE_TODOS",
} as const;

export type ErrorCodesTypes = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
