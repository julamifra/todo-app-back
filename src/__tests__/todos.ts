import { pool } from "../db";
import * as todoModels from "../services/todoServices";
import { Todo } from "../types";
import { server } from "../server";

import supertest from "supertest";
import { app } from "../server";

export const initialNotes = ["Todo test 1", "Todo test 2"];
export const api = supertest(app);

beforeEach(async () => {
  await todoModels.deleteAllTodo();
  const promises = initialNotes.map((todoName) => {
    todoModels.addTodo({ name: todoName });
  });
  await Promise.all(promises);
});

describe("Todos", () => {
  describe("GET /api/todos", () => {
    it("should return todos as json", async () => {
      await api
        .get("/api/todos")
        .expect(200)
        .expect("Content-type", /application\/json/);
    });
    it("should return an array", async () => {
      const response = await api.get("/api/todos");
      expect(Array.isArray(response.body)).toBe(true);
    });
    it("should return two todos", async () => {
      const response = await api.get("/api/todos");
      expect(response.body).toHaveLength(initialNotes.length);
    });
    it("should return task with name and completed fields ", async () => {
      const response = await api.get("/api/todos");
      response.body.forEach((todo: Todo) => {
        expect(todo).toHaveProperty("name");
        expect(todo).toHaveProperty("completed");
      });
    });
  });

  describe("POST /api/todos", () => {
    const newTodo = {
      name: "testing post endpoint",
    };
    it("should return status 201", async () => {
      await api
        .post("/api/todos")
        .send(newTodo)
        .expect(201)
        .expect("Content-type", /application\/json/);
    });
    it("should return the created todo with completed=false", async () => {
      const response = await api.post("/api/todos").send(newTodo);
      expect(response.body).toHaveProperty("name", newTodo.name);
      expect(response.body).toHaveProperty("completed", false);
    });
    it("GET should return all todos", async () => {
      await api.post("/api/todos").send(newTodo);
      const response = await api.get("/api/todos");
      expect(response.body).toHaveLength(initialNotes.length + 1);
    });
    it("should failed if required fields are missing", async () => {
      const newTodoFail = {
        nameFail: "name to fail",
      };
      const response = await api.post("/api/todos").send(newTodoFail);
      expect(response.statusCode).toBe(400);
    });
    it("should failed if required fields have incorrect format", async () => {
      const newTodoFail = {
        name: 222,
      };
      const response = await api.post("/api/todos").send(newTodoFail);
      expect(response.statusCode).toBe(400);
    });
    it("should failed if name is greater than 255", async () => {
      const newTodoFail = {
        name: "a".repeat(256),
      };
      const response = await api.post("/api/todos").send(newTodoFail);
      expect(response.statusCode).toBe(400);
    });
  });

  describe("PUT /api/todos", () => {
    let firstTodoId: string = "";
    const updatedTodo = {
      newCompleted: true,
    };

    beforeEach(async () => {
      const response = await api.get("/api/todos");
      firstTodoId = response.body[0].id;
    });

    it("should return status 204 when update a todo", async () => {
      await api.put(`/api/todos/${firstTodoId}`).send(updatedTodo).expect(204);
    });

    it("should return status 404 when todo not found", async () => {
      await api.put(`/api/todos/-1`).send(updatedTodo).expect(404);
    });

    it("should return status 400 when the field is wrong", async () => {
      const wrongParamTodo = {
        badParam: true,
      };
      await api
        .put(`/api/todos/${firstTodoId}`)
        .send(wrongParamTodo)
        .expect(400);
    });

    it("should return status 400 when required fields are missing", async () => {
      await api.put(`/api/todos/0`).send({}).expect(400);
    });
  });

  describe("DELETE /api/todos", () => {
    it("should return status 204 when deleting an existing todo", async () => {
      const response = await api.get("/api/todos");
      const firstTodoId = response.body[0].id;
      await api.delete(`/api/todos/${firstTodoId}`).expect(204);
    });

    it("should return status 404 when todo not found", async () => {
      await api.delete(`/api/todos/0`).expect(404);
    });
  });
});

afterAll(() => {
  pool.end();
  server.close();
});
