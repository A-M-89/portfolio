import Database from 'better-sqlite3';

const db = new Database('projects.db');

// Function to create the projects table
export function createTables() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,              -- Ensure this matches 'name' in your Project type
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      category TEXT NOT NULL,
      isPublic BOOLEAN NOT NULL DEFAULT TRUE  -- This field should exist in your schema
    )
  `).run();
}
