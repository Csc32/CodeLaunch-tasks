import express from "express";
import dbPromise from "./src/models/database.js";
const app = express();

const server = {
	port: 3000,
};
app.get("/", async (req, res) => {
	try {
		const db = await dbPromise;
		const result = await db.all("SELECT * FROM tasks");
		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
app.listen(server.port, (req, res) => {
	console.log(`Server running at port: ${server.port}`);
});
