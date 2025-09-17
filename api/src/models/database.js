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
  /**
   * Returns the task by id
   * @param {string} id
   * @returns tasks
   */
  async getTasksById(id) {
    if (!id) {
      return false;
    }
    const db = await this.getDb();
    const result = await db.all("SELECT * FROM tasks WHERE id = ?", id);
    return result[0] ?? null;
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
  /**
   * Update a task by id
   * @param {object} params
   * @param {string} id
   * @returns
   */
  async updateTask(params = {}, id) {
    if (Object.entries(params).length == 0) {
      return false;
    }
    const db = await this.getDb();
    const columns = Object.keys(params);
    const setStrings = columns.map((col) => `${col} = ?`).join(",");
    const values = Object.values(params);
    const sql = `UPDATE tasks SET ${setStrings} WHERE id = ? `;
    const stmt = await db.prepare(sql);
    const result = await stmt.run(...values, id);
    await stmt.finalize();
    return result ?? false;
  }
  /**
   * Delete a task by id
   * @param {string} id
   * @returns {boolean}
   */
  async deleteTask(id) {
    if (!id) {
      return false;
    }
    const db = await this.getDb();
    const sql = `DELETE FROM tasks WHERE id = ? `;
    const result = await db.run(sql, id);
    return result ?? false;
  }
}
const DB = new Database();
export default DB;
