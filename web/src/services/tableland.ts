// import { Database } from "@tableland/sdk";

// // Default to grabbing a wallet connection in a browser
// const db = new Database();

// // This is the table's `prefix`--a custom table value prefixed as part of the table's name
// const prefix: string = "reality-haus";


// export const createTable = async () => {
//   const { meta: create } = await db
//   .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
//   .run();

//   //@ts-ignore
//   const { name } = create.txn; // e.g., my_sdk_table_80001_311

//   return name
// }

// export const writeToTable = async (table: string, val: string, name: string) => {
//   const { meta: insert } = await db
//   .prepare(`INSERT INTO ${name} (id, val) VALUES (?, ?);`)
//   .bind(0, "Bobby Tables")
//   .run();

//   // Wait for transaction finality
//   await insert?.txn?.wait();

//   // Perform a read query, requesting all rows from the table
//   const { results } = await db.prepare(`SELECT * FROM ${name};`).all();

// }