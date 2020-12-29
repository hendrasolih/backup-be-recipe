const mySQL = require("mysql");

const db = mySQL.createConnection({
  // Setting DB
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connected from mysql 01");
// });

module.exports = db;
