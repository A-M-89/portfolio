import './style.css';

const darkModeButton = document.getElementById('dark-mode') as HTMLButtonElement | null;

function toggleDarkMode(): void {
  document.body.classList.toggle('dark-mode');
}

if (darkModeButton) {
  darkModeButton.addEventListener('click', toggleDarkMode);
}


const fetchDataFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3999/json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result);

    const id = document.getElementById("projects-list");
    if (!id) return;

    id.innerHTML = ''; 

    for (const project of result) {
      const element = document.createElement("li");
      element.textContent = `${project.title}: ${project.description}`;
      id.appendChild(element);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchDataFromServer();
  