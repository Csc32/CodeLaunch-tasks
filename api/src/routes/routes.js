import { Router } from "express";
import {getTasks, setTasks} from "../controllers/taskController.js";
const router = Router();

router.get("/tasks",getTasks);
router.post("/tasks",setTasks);

export default router;


