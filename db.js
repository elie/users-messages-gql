/** Database setup for users. */

const { Client } = require("pg");

let DB_URI = "postgresql:///users-messages-gql";
const options = {
  connectionString: process.env.DATABASE_URL || DB_URI
};

if (process.env.NODE_ENV === "production") {
  options.ssl = {
    rejectUnauthorized: false
  };
}

let db = new Client(options);

db.connect();

module.exports = db;
