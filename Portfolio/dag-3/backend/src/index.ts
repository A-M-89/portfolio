import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const app = new Hono();

// CORS setup to allow requests from any origin
app.use(
  cors({
    origin: "*", // Allow all origins (adjust if needed)
  })
);

// Construct the path to the projects.json file
const projectsFilePath = join(__dirname, '../Data/projects.json');

// Function to read the projects data from the JSON file
const getProjectsData = () => {
  try {
    const data = readFileSync(projectsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return [];
  }
};

// Function to save the projects data to the JSON file
const saveProjectsData = (projects: any) => {
  try {
    writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error writing to projects.json:', error);
  }
};

// Endpoint to fetch all projects
app.get('/api/projects', async (c) => {
  const data = getProjectsData();
  return c.json(data);
});

// Endpoint to add a new project
app.post('/api/projects', async (c) => {
  try {
    const newProject = await c.req.json(); // Get the new project from request body
    const projects = getProjectsData(); // Get the current list of projects
    newProject.id = Date.now(); // Add an ID to the new project
    newProject.createdAt = new Date().toISOString(); // Add createdAt timestamp
    projects.push(newProject); // Add the new project to the list
    saveProjectsData(projects); // Save the updated list to the file
    return c.json(newProject); // Return the added project or a success message
  } catch (error) {
    console.error('Error processing POST request:', error);
    return c.json({ message: 'Error saving project' }, 500);
  }
});

// Set up the server to listen on port 3999
const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
