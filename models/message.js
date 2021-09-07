const db = require("../db");

class Message {
  static async all({ where } = {}) {
    const username = where?.username;
    let queryStr = `SELECT * FROM messages`;
    let params = [];
    if (username) {
      queryStr += ` WHERE username = $1`;
      params.push(username)
    }
    const result = await db.query(queryStr, params);

    return result.rows;
  }

  static async delete(id) {
    const result = await db.query(`DELETE FROM messages WHERE id=$1 RETURNING id, username, body`, [id]);

    return result.rows[0];
  }

  /** register new message -- returns
   *    {id, username, body}
   */

  static async create({ username, body }) {
    const result = await db.query(
      `INSERT INTO messages (
              username,
              body)
            VALUES ($1, $2)
            RETURNING id, username, body`,
      [username, body]
    );

    return result.rows[0];
  }

  /** Get: get message by id
   *
   */

  static async get(id) {
    const result = await db.query(`SELECT * FROM messages WHERE id = $1`, [id]);

    return result.rows[0];
  }
}

module.exports = Message;
