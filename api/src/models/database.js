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
}
const DB = new Database();
export default DB;
