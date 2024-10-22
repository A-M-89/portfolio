import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { addProject, getProjects } from './db'; // Importing database functions
import { projectSchema } from './schemas'; // Import the Zod schema
import { Project } from './types'; // Import the Project type

const app = new Hono();

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

// Serve all projects (GET request at the root path)
app.get('/', async (c) => {
  try {
    const projects: Project[] = getProjects(); // Retrieve all projects from the database
    return c.json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    return c.json([], 500);
  }
});

// New endpoint to get all projects, filtered by role (GET request)
app.get('/projects', async (c) => {
  try {
    const projects: Project[] = getProjects(); // Retrieve all projects from the database

    // Get user role from cookies
    const userRole = getUserRoleFromCookies(c.req.header('cookie'));

    // Filter projects based on user role
    const filteredProjects =
      userRole === 'admin' ? projects : projects.filter((project) => project.isPublic);

    return c.json(filteredProjects);
  } catch (error) {
    console.error('Error retrieving projects:', error);
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

    // Insert the new project into the database
    const savedProject = addProject({
      name: newProject.name,
      description: newProject.description,
      isPublic: newProject.isPublic,
    });

    return c.json(savedProject);
  } catch (error) {
    console.error('Error saving project:', error);
    return c.json({ error: 'Unable to save project' }, 500);
  }
});

// Define the port and start the server
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
