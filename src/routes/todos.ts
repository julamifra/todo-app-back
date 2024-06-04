import express from "express";
import { validatePost, validatePut } from "../middlewares/validateTodoRoutes";
import * as todoController from "../controllers/todoController";

const router = express.Router();

router.get("/", (req, res) => todoController.getTodos(req, res));

router.post("/", validatePost, todoController.postTodos);

router.put("/:id", validatePut, todoController.putTodos);

router.delete("/:id", todoController.deleteTodos);

export default router;
