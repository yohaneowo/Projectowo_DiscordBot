const sqlite3 = require('better-sqlite3');
const dbPath = './lib/database/SQLite.db'

const db = sqlite3(dbPath)

function getDb() {
    return db
}

function closeDb() {
    db.close()
}

module.exports = {
    getDb,
    closeDb
}