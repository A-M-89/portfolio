import './style.css';
import { z } from "zod";
import { ProjectArraySchema, type Project } from "./types";

// Dark mode toggle functionality
const darkModeButton = document.getElementById('dark-mode') as HTMLButtonElement | null;

function toggleDarkMode(): void {
  document.body.classList.toggle('dark-mode');
}

if (darkModeButton) {
  darkModeButton.addEventListener('click', toggleDarkMode);
}

// Form and list elements
const form = document.getElementById("projectForm") as HTMLFormElement;
const projectsList = document.getElementById("projectsList") as HTMLUListElement;
const projects: Project[] = []; // Changed from `habits` to `projects`

// Handle form submission
form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const newProject: Project = {
    id: crypto.randomUUID(),
    title: (
      (event.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement
    )?.value,
    description: (
      (event.target as HTMLFormElement).elements.namedItem("description") as HTMLInputElement
    )?.value,
    createdAt: new Date(),
  };

  console.log("Submitting new project:", newProject); // Log for debugging

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

    if (response.ok) {
      loadFromApi(); // Use loadFromApi to refresh the list from server
      console.log("Project saved to server");
    } else {
      const errorText = await response.text();
      console.error("Error saving project to server:", response.status, errorText);
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
});



// Update the list of projects on the page
function updateProjectsList() {
  if (!projectsList) return;
  projectsList.innerHTML = "";

  for (const project of projects) {
    const listItem = document.createElement("li");
    listItem.textContent = `${project.title} - ${project.description} - ${new Date(project.createdAt).toLocaleDateString()}`;
    projectsList.appendChild(listItem);
  }
}

// Load data from local JSON file
function loadFromJSON() {
  const jsonId = document.getElementById("json");
  if (jsonId) jsonId.innerHTML = "";

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (const project of data) {
        const element = document.createElement("p");
        element.textContent = `${project.title}`;
        element.textContent = `${project.description}`;
        jsonId?.appendChild(element);
      }
    })
    .catch(error => {
      console.error("Error loading JSON data:", error);
    });
}

// Load data from API
function loadFromApi() {
  fetch("/api/projects")
    .then(response => response.json())
    .then((data: unknown) => {
      try {
        // Validate data with Zod schema
        const validatedProjects = ProjectArraySchema.parse(data);

        projects.length = 0; // Clear existing projects
        projects.push(...validatedProjects);
        updateProjectsList();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Invalid data received from server:", error.errors);
        } else {
          console.error("Unexpected error during data validation:", error);
        }
      }
    })
    .catch(error => {
      console.error("Error fetching data from server:", error);
    });
}

// Initial data load
loadFromApi();
loadFromJSON();
