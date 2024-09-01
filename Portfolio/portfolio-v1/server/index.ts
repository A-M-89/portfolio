import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "../types";
import fs, { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

// Serve statiske filer fra assets mappen
app.use("/assets/*", serveStatic({ root: "./" }));

// Serve statiske filer fra statics (som lages ved build)
app.use("/statics/*", serveStatic({ root: "./" }));

// Setter typen til Projects til å være en array av Project
const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    title: "321",
    description: "123",
  },
];

app.get("/json", async (c) => {
  const data = await fs.readFile("./assets/data.json", "utf8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/api/add", async (c) => {
  const newProject = await c.req.json();
  // Validerer at dataen vi mottar er en gyldig Habit
  const project = ProjectSchema.parse(newProject);
  // Sjekker om Project er en gyldig Project, og returnerer en feilmelding hvis ikke
  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  console.log(project);
  projects.push(project);

  const jsonData = await readFile("./assets/data.json", "utf-8");

  const data = JSON.parse(jsonData);

  // Skriver til filen data.json
  await fs.writeFile(
    "./assets/data.json",
    // Legger til den nye Projecten i listen med Projects
    // Bruker JSON.stringify for å konvertere dataen til en JSON-streng
    JSON.stringify([...data, project], null, 2)
  );

  // Returnerer en liste med alle Projects. Bruker generisk type for å fortelle at vi returnerer en array av Project
  return c.json<Project[]>(projects, { status: 201 });
});

const htmlForm = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ahmad Yahya</title>
    <link rel="stylesheet" href="style.css" />
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

    <section id="projects">
        <h2>Projects</h2>
        <ul id="projectslist">

        </ul>
        <pre id="json"></pre>
    </section>
    
         


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

    <script type="module" src="main.ts"></script>
  </body>
</html>

`;

app.get("/html", (c) => {
  return c.html(htmlForm);
});

app.get("/api/projects", (c) => {
  // Returnerer en liste med alle Projects. Bruker generisk type for å fortelle at vi returnerer en array av Project
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);


export default app;

serve({
  fetch: app.fetch,
  port
})