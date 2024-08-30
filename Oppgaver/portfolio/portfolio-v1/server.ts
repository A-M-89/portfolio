import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises"; // Correct import for readFile

const app = new Hono();

// Enable CORS
app.use("/*", cors());

// Serve static files from the project root
app.use("/*", serveStatic({ root: "./" }));

// Serve index.html at the root URL
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

console.log(`Server is running`);

serve({
    fetch: app.fetch,
    port,
});
