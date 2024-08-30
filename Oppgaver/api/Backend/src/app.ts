// ./src/app.ts

import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (c) => {
  return c.json({
    data: [
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
    ],
  });
});

export default app;