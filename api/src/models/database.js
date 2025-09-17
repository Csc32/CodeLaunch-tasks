import Connection from "../libs/connection.js";
/**
 * Class to query management
 * @extends Connection
 */
class Database extends Connection {
  /**
   * Initialize database connection from the parent class
   */
  constructor() {
    super();
  }
  /**
   * Returns all tasks from the database
   * @returns
   */
  async getTasks() {
    const db = await this.getDb();
    return db.all("SELECT * FROM tasks");
  }
  async insertTask(params = {}) {
    if (Object.entries(params).length == 0) {
      return false;
    }
    const db = await this.getDb();
    const columns = Object.keys(params);
    const values = Object.values(params);
    const placeholders = columns.map(() => `?`);
    const sql = `INSERT INTO tasks (${columns.join(
      ","
    )}) VALUES (${placeholders.join(",")})`;
    const stmt = await db.prepare(sql);
    const result = await stmt.run(values);
    return result ?? false;
  }
}
const DB = new Database();
export default DB;
