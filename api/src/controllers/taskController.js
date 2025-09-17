import DB from "../models/database.js";

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

export async function setTasks(req, res) {
  try {
    const { title, description, done } = req.body;
    const result = DB.insertTask({ title, description, done: done ?? 0 });
    return !result
      ? res.status(400).json({ message: "Error to add tasks, try again" })
      : res.status(200).json({ message: "Task added" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const db = await dbPromise;
    const { title, description, done } = req.body;
    const { id } = req.params;
    const query = await db.all("SELECT * FROM tasks WHERE id = :id", {
      ":id": id,
    });
    const result = await db.run(
      "UPDATE tasks SET title = :title, description = :description, done = :done WHERE id = :id",
      {
        ":id": id,
        ":title": title ?? query["title"],
        ":description": description ?? query["description"],
        ":done": done ?? query["done"],
      }
    );
    return !result
      ? res.status(400).json({ message: "Error to add tasks, try again" })
      : res
          .status(200)
          .json({ message: `tasks with id: ${id} have been updated` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function removeTask(req, res) {
  try {
    const db = await dbPromise;
    const { id } = req.params;

    const result = await db.run("DELETE FROM tasks WHERE id = :id", {
      ":id": id,
    });
    return !result
      ? res.status(400).json({ message: "Error to add tasks, try again" })
      : res
          .status(200)
          .json({ message: `tasks with id: ${id} have been deleted` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
