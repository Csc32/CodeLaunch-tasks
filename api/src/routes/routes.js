import { Router } from "express";
import {
	getTasks,
	removeTask,
	setTasks,
	updateTask,
} from "../controllers/taskController.js";
import validationMiddleware from "../middlewares/validateMiddleware.js";
const router = Router();

router.get("/tasks", getTasks);
router.post(
	"/tasks",
	validationMiddleware([
		{ field: "title", rules: ["required", "min:3"] },
		{ field: "description", rules: ["max:200"] },
		{ field: "done", rules: ["boolean"] },
	]),
	setTasks,
);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", removeTask);

export default router;
