import './assets/style.css';
import { z } from "zod";
import { ProjectArraySchema, type Project } from "../types";

// Function to toggle dark mode
const darkModeButton = document.getElementById('dark-mode') as HTMLButtonElement | null;
function toggleDarkMode(): void {
  document.body.classList.toggle('dark-mode');
}

if (darkModeButton) {
  darkModeButton.addEventListener('click', toggleDarkMode);
}

// Function to fetch projects from the backend and display them
async function fetchProjects() {
  try {
    const response = await fetch('http://localhost:3999/projects');
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

// Function to display projects in the list
function displayProjects(projects: Project[]) {
  const projectsList = document.getElementById('projectslist') as HTMLUListElement;
  projectsList.innerHTML = '';

  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.textContent = `${project.title} - ${project.description} (${project.category}) - ${new Date(project.createdAt).toLocaleDateString()}`;
    projectsList.appendChild(listItem);
  });
}

// Form submission handler for adding a new project
const form = document.getElementById("projectForm") as HTMLFormElement;
const projects: Project[] = [];

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const newProject = {
    id: crypto.randomUUID(),
    title: (
      (event.target as HTMLFormElement).elements.namedItem(
        "title"
      ) as HTMLInputElement
    )?.value,
    description: (
      (event.target as HTMLFormElement).elements.namedItem(
        "description"
      ) as HTMLInputElement
    )?.value,
    createdAt: new Date().toISOString(),
    category: "General", // Set a default category or allow user input
  };

  projects.push(newProject);
  updateProjectsList();

  try {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.status === 201) {
      loadFromJSON();
      console.log("Project successfully saved on the server");
    } else {
      console.error("Error saving project to server");
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
});

// Function to update the project list in the DOM
function updateProjectsList() {
  const projectsList = document.getElementById('projectslist') as HTMLUListElement;
  if (!projectsList) return;

  projectsList.innerHTML = '';
  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.textContent = `${project.id} - ${project.title} - ${project.description} (${project.category}) - ${new Date(project.createdAt).toLocaleDateString()}`;
    projectsList.appendChild(listItem);
  });
}

// Function to load and display projects from a JSON file
function loadFromJSON() {
  const jsonId = document.getElementById("json");
  if (jsonId) jsonId.innerHTML = "";

  fetch("assets/data.json")
    .then((response) => response.json())
    .then((data: Project[]) => {
      console.log(data);
      data.forEach(project => {
        const element = document.createElement("p");
        element.textContent = `${project.id} - ${project.title} \n ${project.description}`;
        jsonId?.appendChild(element);
      });
    });
}

// Function to load and validate projects from the API using Zod
function loadFromApi() {
  fetch("/projects")
    .then((response) => response.json())
    .then((data: unknown) => {
      try {
        const validatedProjects = ProjectArraySchema.parse(data);
        projects.push(...validatedProjects);
        updateProjectsList();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Invalid data received from the server:", error.errors);
        } else {
          console.error("Unexpected error validating data:", error);
        }
      }
    })
    .catch((error: Error) => {
      console.error("Error fetching data from server:", error);
    });
}

// Initial load of projects from both API and JSON file
loadFromApi();
loadFromJSON();
fetchProjects()