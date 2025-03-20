import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/add-task", protectRoute, addTask);

router.post("/tasks", protectRoute, getTasks);

router.delete("/tasks/:id", protectRoute, deleteTask);

router.put("/tasks/:id", protectRoute, updateTask);

export default router;
