import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// Define the Project type
type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

// Define a Zod schema for validation
const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string().transform(str => new Date(str)),
});




// Define the array of projects
const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    title: "Project",
    description: "description",
    createdAt: new Date("2024-01-01"),
  },
];

const app = new Hono();

app.use("/*", cors());

// Serve static files from the 'root directory' folder
app.use("/static/*", serveStatic({ root: path.resolve(__dirname) }));


// Serve JSON data from a file
app.get("/json", async (c) => {
  try {
    const filePath = path.resolve(__dirname, 'data.json');
    const data = await readFile(filePath, "utf8");
    const dataAsJson = JSON.parse(data);
    return c.json(dataAsJson);
  } catch (error) {
    console.error("Error reading data.json:", error);
    return c.json({ error: "Error reading data.json" }, { status: 500 });
  }
});

// Add a new project
app.post("/api/add", async (c) => {
  try {
    const newProject = await c.req.json();
    // Validate the incoming project data
    const project = ProjectSchema.parse(newProject);
    
    projects.push(project);

    const filePath = path.resolve(__dirname, 'data.json');
    const jsonData = await readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);

    await writeFile(filePath, JSON.stringify([...data, project], null, 2));

    return c.json<Project[]>(projects, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid Project data" }, { status: 400 });
    } else {
      console.error("Error adding project:", error);
      return c.json({ error: "Error adding project" }, { status: 500 });
    }
  }
});



// HTML form for the front-end
const htmlForm = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ahmad Yahya</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <header>
      <h1>Ahmad Yahya</h1>
      <p>Web Developer & Designer</p>
      <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    
    <button type="button" id="dark-mode">Dark Mode</button>

    <section id="profil">
      <h2>Profil</h2>
      <p>Effektiv, sosial og fleksibel, ansvarsbevisst, har evnen til å kunne tilpasse meg situasjoner og arbeidsmiljø på kort tid og lærer veldig raskt.</p>
    </section>

    <section id="skills">
      <h2>Skills</h2>
      <ul>
        <li>HTML/CSS</li>
        <li>JavaScript</li>
        <li>SQL</li>
      </ul>
    </section>

<section id="projects">
      <h2>Projects</h2>
      <div class="projects">
        <ol id="projectItems">
          <li>
            <h3>Portfolio-v1</h3>
            <p>Description: First project description</p>
          </li>
        </ol>
      </div>
    </section>
    <p>Legg til ny projekt</p>
    <form id="projectForm">
      <label for="title">Project Title:</label>
      <input type="text" id="title" name="title" required />
      <br />
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" required />
      <br />
      <button type="submit">Add Project</button>
    </form>

    <ul id="projectslist">
      
    </ul>
     <pre id="json"></pre>



    <section id="contact">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:Ahmad.Yahya@hiof.no">Ahmad.Yahya@hiof.no</a></p>
      <p>Github: <a href="https://github.com/A-M-89/Ahmadyahya89.github.io" target="_blank">Ahmad Yahya Github</a></p>
      <form>
        <label for="input">Message:</label>
        <input type="text" id="input" placeholder="Type your message here..." />
        <button type="submit">Send</button>
      </form>
    </section>

    <footer>
      <p>&copy; 2024 Ahmad Yahya. All rights reserved.</p>
    </footer>

    <script type="module" src="/main.ts"></script>
  </body>
</html>

`;

app.get("/html", (c) => {
  return c.html(htmlForm);
});

// Endpoint to get all projects
app.get("/api/projects", (c) => {
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
