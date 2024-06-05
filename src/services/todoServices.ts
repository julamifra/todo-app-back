import { QueryResult } from "pg";
import { pool } from "../db";
import { NameTodo, Todo, UpdateTodo } from "../types";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await pool.query("SELECT * FROM todos");
  return res.rows;
};

export const addTodo = async ({ name }: NameTodo) => {
  const res = await pool.query(
    "INSERT INTO todos (name) VALUES ($1) RETURNING *",
    [name]
  );
  return res.rows[0];
};

export const updateTodo = async ({
  id,
  newName = null,
  newCompleted = null,
}: UpdateTodo): Promise<QueryResult<[]>> => {
  let res = await pool.query(
    `UPDATE todos
    SET 
        name = COALESCE($1, name),
        completed = COALESCE($2, completed)
    WHERE id = $3`,
    [newName, newCompleted, id]
  );
  return res;
};

export const deleteTodo = async (id: number): Promise<QueryResult<[]>> => {
  const res = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  return res;
};

export const deleteAllTodo = async (): Promise<QueryResult<[]>> => {
  const res = await pool.query("TRUNCATE Table todos");
  return res;
};
