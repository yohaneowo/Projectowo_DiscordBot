const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydatabase.db");
const fs = require("fs");

// 讀取從 DB Browser for SQLite 導出的 SQL 文件
const sql = fs
  .readFileSync(process.cwd() + "/lib/database/SQLite.db.sql")
  .toString();

// 在新的數據庫中運行創建表語句
db.exec(sql, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Tables created successfully!");
});
