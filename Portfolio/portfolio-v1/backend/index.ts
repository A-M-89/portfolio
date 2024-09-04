import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "../types";
import fs, { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/assets/*", serveStatic({ root: "./" }));
app.use("/statics/*", serveStatic({ root: "./" }));

const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills.",
    createdAt: new Date().toISOString(),
    category: "Web Development",
  },
  {
    id: crypto.randomUUID(),
    title: "E-commerce Platform",
    description: "An online store for selling products.",
    createdAt: new Date().toISOString(),
    category: "Web Development",
  },
  {
    id: crypto.randomUUID(),
    title: "Blog Website",
    description: "A blog platform for sharing articles.",
    createdAt: new Date().toISOString(),
    category: "Content Creation",
  }
];

app.get("/json", async (c) => {
  const data = await fs.readFile("./assets/data.json", "utf8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/api/add", async (c) => {
  const newProject = await c.req.json();
  const project = ProjectSchema.parse(newProject);
  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  projects.push(project);

  const jsonData = await readFile("./assets/data.json", "utf-8");
  const data = JSON.parse(jsonData);

  await fs.writeFile(
    "./assets/data.json",
    JSON.stringify([...data, project], null, 2)
  );

  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/projects", (c) => {
  return c.json<Project[]>(projects);
});

const port = 3999;
console.log(`Server is running on port ${port}`);
export default app;

serve({ fetch: app.fetch, port });
