import { Router } from "express";
import {getTasks, removeTask, setTasks, updateTask} from "../controllers/taskController.js";
const router = Router();

router.get("/tasks",getTasks);
router.post("/tasks",setTasks);
router.put("/tasks/:id",updateTask);
router.delete("/tasks/:id",removeTask);

export default router;


