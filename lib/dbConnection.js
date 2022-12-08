const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",

  user: "root",

  //   password: "",
  port: 3306,
  database: "company_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});

module.exports = db;
