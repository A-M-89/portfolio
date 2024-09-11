import { readFile, writeFile } from "node:fs/promises";
import type { Projects } from "./types";

export async function getProjectsData() {
  const data = await readFile("./data/Projects.json", "utf-8");
  const parsedData = JSON.parse(data) as Projects[];
  return parsedData;
}

export async function updateProjectsData(newData: Projects[]) {
  await writeFile("./data/Projects.json", JSON.stringify(newData));
}