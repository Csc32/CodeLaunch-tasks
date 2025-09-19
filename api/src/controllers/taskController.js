import DB from "../models/database.js";

/**
 * Get all tasks from the database
 * Handles GET requests to fetch all tasks.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<Response>} JSON response with tasks or error message
 */
export async function getTasks(req, res) {
	try {
		const tasks = await DB.getTasks();
		return tasks.length > 0
			? res.status(200).json(tasks)
			: res.status(404).json({ message: "Tasks Not found" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

/**
 * Insert a new task into the database
 * Handles POST requests to create a new task.
 *
 * @param {import("express").Request} req - Express request object, expects body with {title, description, done}
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success or error message
 */
export async function setTasks(req, res) {
	try {
		const { title, description, done } = req.validated;
		const result = DB.insertTask({ title, description, done: done ?? 0 });
		return !result
			? res.status(400).json({ message: "Error to add tasks, try again" })
			: res.status(200).json({ message: "Task added" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

/**
 * Update an existing task in the database
 * Handles PUT requests to modify a task by its id.
 *
 * @param {import("express").Request} req - Express request object, expects params.id and req.validated with {title, description, done}
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success or error message
 */
export async function updateTask(req, res) {
	try {
		const { title, description, done } = req.validated;
		const { id } = req.params;
		const task = await DB.getTasksById(id);
		if (!task) {
			return res.status(404).json({ message: "task not found" });
		}
		const result = await DB.updateTask(
			{
				title: title !== undefined && title !== "" ? title : task.title,
				description:
					description !== undefined && description !== ""
						? description
						: task.description,
				done: done !== undefined ? done : task.done,
			},
			id,
		);
		return !result
			? res.status(400).json({ message: "Error to add tasks, try again" })
			: res
					.status(201)
					.json({ message: `tasks with id: ${id} have been updated` });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

/**
 * Delete a task from the database
 * Handles DELETE requests to remove a task by its id.
 *
 * @param {import("express").Request} req - Express request object, expects params.id
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success or error message
 */
export async function removeTask(req, res) {
	try {
		const { id } = req.params;

		const result = DB.deleteTask(id);
		return !result
			? res.status(400).json({ message: "Error to add tasks, try again" })
			: res
					.status(200)
					.json({ message: `tasks with id: ${id} have been deleted` });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}
