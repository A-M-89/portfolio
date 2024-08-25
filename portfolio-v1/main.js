import './style.css'

const darkModeButton = document.getElementById('dark-mode')

console.log(darkModeButton)

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode') }
  darkModeButton.addEventListener('click', toggleDarkMode)



  // Lagre prosjektet i localStorage
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projects));

  // Tilbakestill skjemaet
  form.reset();

  // Vis en bekreftelsesmelding eller oppdater en liste med prosjekter
  alert('Prosjektet er opprettet!');

  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      const projectList = document.getElementById('projectList');

      data.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.title;
        projectList.appendChild(listItem);
      });
    });



const form = document.getElementById('NyProjekt');

form.addEventListener('lagre', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const newProject = {
    title,
    description,
    createdAt: new Date().toISOString()
  };
});
