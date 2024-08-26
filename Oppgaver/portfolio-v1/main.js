import './style.css'

const darkModeButton = document.getElementById('dark-mode')

console.log(darkModeButton)

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode') }
  darkModeButton.addEventListener('click', toggleDarkMode)


const form = document.getElementById("NewProjectFrom");
const projectsList = document.getElementById("projectsList");
const projects = [];

form.addEventListener("submit"), async (event) => {
  event.preventDefault();

  const newProject = {
    title: event.target.elements.title.value,
    createdAt: new Date(),
};

projects.push(newProject);
updateProjectsList();
  // Forsøker å sende vanen til serveren
  try {
    const response = await fetch("http://localhost:5173/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    // Håndterer serverresponsen
    if (response.status === 201) {
      console.log("Project lagret på serveren");
    } else {
      console.error("Feil ved lagring av Project på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }

// Funksjon for å oppdatere visningen av vaner på nettsiden
function updateProjectsList() {
  console.log(projects);
  projectsList.innerHTML = ""; // Tømmer listen før ny oppdatering

  // Legger til hver vane som et listeelement
  for (const project of projects) {
    const listItem = document.createElement("li");
    listItem.textContent = `${project.title} - ${new Date(
      project.createdAt
    ).toLocaleDateString()}`;
    projectsList.appendChild(listItem);
  }
}
function loadFromApi() {
  fetch("http://localhost:5173")
    .then((response) => response.json())
    .then((data) => {
      habits.push(...data); // Legger til vaner fra API-et i den interne listen
      updateHabitsList(); // Oppdaterer visningen på nettsiden
    })
    .catch((error) => {
      console.error("Feil ved henting av data fra serveren:", error);
    });
}

loadFromApi();
}