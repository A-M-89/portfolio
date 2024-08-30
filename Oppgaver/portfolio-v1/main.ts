import './style.css';

const darkModeButton = document.getElementById('dark-mode') as HTMLButtonElement | null;

function toggleDarkMode(): void {
  document.body.classList.toggle('dark-mode');
}

if (darkModeButton) {
  darkModeButton.addEventListener('click', toggleDarkMode);
}

const fetchDataFromServer = async () => {
  const response = await fetch("http://localhost:3999/json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  console.log(result);

  const id = document.getElementById("json");
  if (!id) return;
  // id.innerHTML = result;
  for (const habit of result) {
    const element = document.createElement("p");
    element.textContent = habit.title;
    id.appendChild(element);
  }
};

fetchDataFromServer();
