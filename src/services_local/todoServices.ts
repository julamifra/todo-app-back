import { IdTodo, NameTodo, Todo, UpdateTodo } from "../types";
import todosData from "./todos.json";

const todos: Todo[] = todosData;

export const getTodos = () => todos;

export const findTodoById = (id: number): Todo | undefined => {
  const todoFound = todosData.find((t) => t.id === id);
  return todoFound;
};

export const addTodo = ({ name }: NameTodo): Todo => {
  const newTodo: Todo = {
    id: Math.max(...todos.map((t) => t.id)) + 1,
    name: name,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const updateTodo = ({ id, newName, newCompleted }: UpdateTodo): Todo => {
  const index = todos.findIndex((t) => t.id == id);
  if (index === -1) {
    throw new Error("ERROR_PUT_TODOS_404");
  }
  newName ? (todos[index].name = newName) : null;
  newCompleted ? (todos[index].completed = newCompleted) : null;
  return todos[index];
};

export const deleteTodo = ({ id }: IdTodo): Todo => {
  const index = todos.findIndex((t) => t.id == id);
  if (index === -1) {
    throw new Error("ERROR_DELETE_TODOS_404");
  }
  const todoToDelete = todos.find((t) => t.id == id);
  todos.splice(index, 1);

  return todoToDelete ?? ({} as Todo);
};
