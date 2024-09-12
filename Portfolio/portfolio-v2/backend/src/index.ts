import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { promises as fs } from 'fs'
import path from 'path'

const app = new Hono()

const dataFilePath = path.join(__dirname, 'projects.json')

// Middleware to allow CORS
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],  // Allow requests from Vite frontend
    allowMethods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
    allowHeaders: ['Content-Type'], // Allow specific headers
  })
)

// Serve existing projects (GET request)
app.get('/', async (c) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8')
    // Log the data to check if it's properly formatted
    console.log('Read data:', data)
    const projects = JSON.parse(data)
    return c.json(projects)
  } catch (error) {
    console.error('Error reading projects:', error)
    return c.json([], 500) // Return an empty array in case of error
  }
})

// Add a new project (POST request)
app.post('/projects', async (c) => {
  try {
    const body = await c.req.json()  // Parse the incoming request body
    console.log('Request body:', body) // Log the request body

    // Read the existing projects
    let projects = []
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8')
      projects = JSON.parse(data)
    } catch (err) {
      console.error('Error reading projects:', err)
      // If file does not exist, we'll create it with an empty array
    }

    // Add the new project
    projects.push(body)

    // Save the updated projects to the file
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2))

    return c.json(projects)
  } catch (error) {
    console.error('Error saving project:', error)
    return c.json({ error: 'Unable to save project' }, 500)
  }
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
