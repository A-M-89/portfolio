import './assets/style.css'
import { z } from "zod";
import { ProjectArraySchema, type Project } from "./types";


const darkModeButton = document.getElementById('dark-mode') as HTMLButtonElement | null;
function toggleDarkMode(): void {
  document.body.classList.toggle('dark-mode');
}

if (darkModeButton) {
  darkModeButton.addEventListener('click', toggleDarkMode);
}

const form = document.getElementById("projectForm") as HTMLFormElement;
const projectsList = document.getElementById("projectsList") as HTMLUListElement;
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
      console.log("Vane lagret på serveren");
    } else {
      console.error("Feil ved lagring av vane på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});

function updateProjectsList() {
  console.log(projects);
  if (!projectsList) return;
  projectsList.innerHTML = "";
    for (const project of projects) {
    const listItem = document.createElement("li");
    listItem.textContent = `${project.id} - ${project.title} - ${project.description}
    ).toLocaleDateString()}`;
    projectsList.appendChild(listItem);
  }
}

function loadFromJSON() {
  // Henter ut div med id `json`
  const jsonId = document.getElementById("json");
  if (jsonId) jsonId.innerHTML = "";

  fetch("assets/data.json")
    .then((response) => {
      // Konverterer data til json format
      return response.json();
    })
    .then((data) => {
      // Debugging
      console.log(data);
      // Går igjennom dataen og lager en `p` til hvert element.
      for (const project of data) {
        const element = document.createElement("p");
        // Legger til verdien koblet til `title` nøkkelen i .json filen
        element.textContent = `${project.id} - ${project.title} \n ${project.description}`;
        // Legger innholdet til div-ens
        jsonId?.appendChild(element);
      }

      
    });
}

function loadFromApi() {
  fetch("/api/projects")
    .then((response) => response.json())
    .then((data: unknown) => {
      try {
        // Forsøker å parse og validere dataene med Zod-skjemaet
        const validatedProjects = ProjectArraySchema.parse(data);

        projects.push(...validatedProjects); // Legger til validerte vaner i den interne listen
        updateProjectsList(); // Oppdaterer visningen på nettsiden
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Ugyldig data mottatt fra serveren:", error.errors);
        } else {
          console.error("Uventet feil ved validering av data:", error);
        }
      }
    })
    .catch((error: Error) => {
      console.error("Feil ved henting av data fra serveren:", error);
    });
}

loadFromApi();
loadFromJSON();
