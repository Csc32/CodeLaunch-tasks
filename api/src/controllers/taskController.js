import dbPromise from "../models/database.js"


export async function getTasks(req, res) {
	try {
		const db = await dbPromise;
		const result = await db.all("SELECT * FROM tasks");
		return result.length > 0 ? res.json(result) : res.status(404).json({ message: "Tasks Not found" })
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

export async function setTasks(req, res) {
	try {
		const db = await dbPromise;
		const { title, description, done } = req.body
		const result = await db.run("INSERT INTO tasks(title,description,done) VALUES (:title, :description, :done )", {
			':title': title,
			':description': description,
			':done': done ?? false,
		});
		return !result ? res.status(400).json({ message: 'Error to add tasks, try again' }) : res.status(200).json({ message: 'Task added' })
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}