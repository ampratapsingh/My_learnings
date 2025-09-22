import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// async function createUserTable() {
//   await client.connect();

//   const result = await client.query(`
//     CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(50) UNIQUE NOT NULL,
//       email VARCHAR(50) UNIQUE NOT NULL,
//       password VARCHAR(50) UNIQUE NOT NULL,
//       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     )`);
//   console.log(result);
// }

// createUserTable();

async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect();
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const result = await client.query(insertQuery, values);
    console.log("Insertion successful:", result);
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.end();
  }
}

insertData("username", "email", "password");