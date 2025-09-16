import { Router } from "express";
import {getTasks, setTasks, updateTask} from "../controllers/taskController.js";
const router = Router();

router.get("/tasks",getTasks);
router.post("/tasks",setTasks);
router.put("/tasks/:id",updateTask);

export default router;


