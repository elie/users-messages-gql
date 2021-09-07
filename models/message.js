const db = require("../db");

class Message {
  static async all({ where }) {
    const username = where?.username;
    let queryStr = `SELECT * FROM messages`;
    if (username) {
      queryStr += ` WHERE username = $1`;
    }
    const result = await db.query(queryStr, [username]);

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
    const result = await db.query(
      `SELECT m.id,
                m.username,
                f.first_name AS from_first_name,
                f.last_name AS from_last_name,
                m.body,
          FROM messages AS m
            JOIN users AS f ON m.username = f.username
          WHERE m.id = $1`,
      [id]
    );

    let m = result.rows[0];

    return {
      id: m.id,
      body: m.body,
      user: {
        username: m.from_username,
        first_name: m.from_first_name,
        last_name: m.from_last_name
      }
    };
  }
}

module.exports = Message;
