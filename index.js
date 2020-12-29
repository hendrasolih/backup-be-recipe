require("dotenv").config();
const express = require("express");
//const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mysql = require("mysql");
// const expressValidator = require("express-validator");
// const nodemailer = require("nodemailer");

const mainRouter = require("./src/routes/index");

const app = express();

// logger
app.use(logger("dev"));

// memperbolehkan access dari semua origin
app.use(cors());

//static
app.use(express.static("public"));

// menambahkan parser untuk x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// menambahkan parser untuk raw json
app.use(express.json());

// Routes
app.use("/", mainRouter);

const db_config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code == `PROTOCOL_CONNECTION_LOST`) {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      console.log("error here");
      handleDisconnect();
      throw err; // server variable configures this)
    }
  });
  console.log("db connect");
}

handleDisconnect();

// const port = 5000
app.listen(process.env.PORT, () => {
  console.log(`Server is Running at ${process.env.PORT}`);
});
