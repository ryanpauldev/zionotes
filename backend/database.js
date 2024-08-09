const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('zionotes.db'); // This will create a file-based database named zionotes.db

// Create submissions table with unique constraint on email
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      videoUrl TEXT NOT NULL,
      submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;