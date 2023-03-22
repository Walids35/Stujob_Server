const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});
const connectD = async () => {
  try {
    const connection = await con.connect();
    console.log("Database CONNECTED!");
  } catch (error) {
    console.log("db connection FAILED");
  }
};
module.exports = { connectD, con };
