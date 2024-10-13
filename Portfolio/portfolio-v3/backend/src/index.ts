import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { promises as fs } from 'fs';
import path from 'path';
import { projectSchema } from './schemas'; // Import the Zod schema

const app = new Hono();
const dataFilePath = path.join(__dirname, 'projects.json');

// Middleware to allow CORS
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);

// Function to get user role from cookies
const getUserRoleFromCookies = (cookieHeader: string | undefined): string | null => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'user.role') {
      return value;
    }
  }
  return null;
};

// Serve existing projects (GET request at the root path)
app.get('/', async (c) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const projects = JSON.parse(data);
    return c.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return c.json([], 500);
  }
});

// New endpoint to get all projects (GET request)
app.get('/projects', async (c) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const projects = JSON.parse(data);

    // Get user role from cookies
    const userRole = getUserRoleFromCookies(c.req.header('cookie'));

    // Filter projects based on user role
    const filteredProjects =
      userRole === 'admin' ? projects : projects.filter((project: any) => project.public);

    return c.json(filteredProjects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return c.json([], 500);
  }
});

// Add a new project (POST request) with validation
app.post('/projects', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Request body:', body);

    // Validate the request body against the project schema
    const parsedProject = projectSchema.safeParse(body); // Validate the data

    if (!parsedProject.success) {
      console.error('Validation errors:', parsedProject.error.format());
      return c.json({ errors: parsedProject.error.format() }, 400); // Return errors if validation fails
    }

    const newProject = parsedProject.data; // Use validated data
    newProject.createdAt = new Date().toISOString(); // Set createdAt

    // Read existing projects
    let projects = [];
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      projects = JSON.parse(data);
    } catch (err) {
      console.error('Error reading projects:', err);
    }

    // Add the new project
    projects.push(newProject);

    // Save the updated projects to the file
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));

    return c.json(projects);
  } catch (error) {
    console.error('Error saving project:', error);
    return c.json({ error: 'Unable to save project' }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port
});
