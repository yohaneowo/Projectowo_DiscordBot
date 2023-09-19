


import sqlite3 from "better-sqlite3"
const dbPath = "./lib/database/SQLite.db"
const db = sqlite3(dbPath)

function getDb() {
  return db
}




function closeDb() {
  db.close()
}

export default {getDb, closeDb}
