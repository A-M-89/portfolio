import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  const data = await readFile("./data.json", "utf-8");
  return c.json(JSON.parse(data));
});

app.get("/", async (c) => {
    try {
        const html = await readFile("./index.html", "utf-8");
        return c.html(html);
    } catch (error) {
        console.error("Error reading index.html:", error);
        return c.text("Error loading page", 500);
    }
});
const port = 3999;

console.log("Server is running YEAH");

serve({
  fetch: app.fetch,
  port,
});
