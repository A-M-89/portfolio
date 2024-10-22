import Database from 'better-sqlite3';
import { createTables } from './tables';
import { Project } from '../types'; // Import the Project type

// Initialize the database
const db = new Database('projects.db');

createTables(); // Ensure tables are created when the application starts

// Function to retrieve all projects
export function getProjects(): Project[] {
  const stmt = db.prepare(`
    SELECT id, name, description, category, isPublic, createdAt
    FROM projects
  `);
  const projects = stmt.all(); // No type assertion yet
  console.log(projects); // Log the retrieved projects
  return projects as Project[]; // Now you can assert after logging
}


// Function to add a new project
export function addProject(project: { name: string; description?: string; isPublic: boolean }) {
  const stmt = db.prepare(`
    INSERT INTO projects (name, description, isPublic)
    VALUES (?, ?, ?)
  `);
  const info = stmt.run(project.name, project.description || null, project.isPublic);

  return { id: info.lastInsertRowid, ...project }; // Return added project with id
}
