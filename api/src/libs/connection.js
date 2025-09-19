import sqlite3 from "sqlite3";
import { open } from "sqlite";
sqlite3.verbose();

/**
 *  Connection class to manage SQLITE connections
 *
 */
class Connection {
  /**
   * Create a new database connection manager
   * @param {string} [filename=process.cwd() + "/tasks.db"] - Path to the database file.
   * @param {typeof sqlite3.Database} [driver=sqlite3.Database] - Database driver to use.
   */
  constructor(
    filename = process.cwd() + "/tasks.db",
    driver = sqlite3.Database
  ) {
    this.dbPromise = open({
      filename: filename,
      driver: driver,
    });
  }
  /**
   * Returns the database connection.
   * If the connection has not been established yet, it opens it first.
   * @returns {Promise<import("sqlite").Database>} Database instance.
   */
  async getDb() {
    if (!this.db) {
      this.db = await this.dbPromise;
    }
    return this.db;
  }
}

export default Connection;
