import mysql from 'mysql';
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql.createConnection({
    port:process.env.DB_PORT,
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password:process.env.DB_PASSWORD, 
    database:process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
  });

export default connection;
  
  