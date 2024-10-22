// db/seed.ts

import fs from 'fs';
import Database from 'better-sqlite3';
import { createTables } from './tables';

// Initialize database and create tables
const db = new Database('projects.db');
createTables();

// Load seed data from JSON file
const seedDataPath = './db/data.json';
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

// Insert each project into the database
const insertProject = db.prepare(`
  INSERT INTO projects (name, description, isPublic)
  VALUES (?, ?, ?)
`);

seedData.forEach((project: { name: string; description?: string; isPublic: boolean }) => {
  insertProject.run(project.name, project.description || null, project.isPublic);
});

console.log('Seeding completed.');
