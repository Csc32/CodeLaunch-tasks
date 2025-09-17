import sqlite3 from "sqlite3";
import { open } from "sqlite";
sqlite3.verbose();
const dbPromise = open({
	filename: `${process.cwd()}/tasks.db`,
	driver: sqlite3.Database,
});

export default dbPromise;
