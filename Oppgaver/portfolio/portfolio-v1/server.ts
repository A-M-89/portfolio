import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./" }));

app.get("/projects", async (c) => {
  try {
    const projects = await readFile("./projects.json", "utf-8");
    return c.json(JSON.parse(projects));
  } catch (error) {
    return c.json({ error: "Could not read projects data." });
  }
});

const port = 3999;

console.log(`Server is running`);

serve({
  fetch: app.fetch,
  port,
});
