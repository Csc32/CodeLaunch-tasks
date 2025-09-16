import dbPromise from  "../models/database.js"


export async function getTasks(req,res){
   try {
		const db = await dbPromise;
		const result = await db.all("SELECT * FROM tasks");
        return result.length > 0 ? res.json(result) : res.status(404).json({message: "Tasks Not found"})
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}