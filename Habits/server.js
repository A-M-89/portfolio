import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./static" }));

const habits = [
  {
    id: crypto.randomUUID(),
    title: "Game",
    createdAt: new Date("2024-01-01"),
    categories: ["spill"],
  },
  {
    id: crypto.randomUUID(),
    title: "Kode",
    createdAt: new Date("2024-01-04"),
    categories: ["koding", "programmering"],
  },
  {
    id: crypto.randomUUID(),
    title: "Trene",
    createdAt: new Date("2024-01-07"),
    categories: ["trening", "helse"],
  },
  {
    id: crypto.randomUUID(),
    title: "Lese",
    createdAt: new Date("2024-01-02"),
    categories: ["programmering"],
  },
];

const pageHTML = `
<!DOCTYPE html lang="no">
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/static/styles.css">
    <title>Streaky</title>
</head>
<body>
    <h1>Du har ${habits.length} vaner</h1>
    <ul id="habit-list"></ul> <!-- Updated to include a list for habits -->
    <input type="text" id="new-habit-input" placeholder="Ny vane">
    <button id="add-habit-button">Legg til vane</button>
    <img src="/static/webapp.png" alt="Streaky logo" />
    <script type="module" src="/static/main.js"></script>
</body>
</html>`;

app.get("/", (c) => {
  return c.html(pageHTML);
});

app.get("/habits", (c) => {
  return c.json(habits);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
