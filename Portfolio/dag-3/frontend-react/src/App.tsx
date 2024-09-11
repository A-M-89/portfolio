import React, { useState, useEffect } from 'react';
import './App.css';
import Projects from '../components/Projects';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [projects, setProjects] = useState<{ title: string; description: string }[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch existing projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Error fetching projects:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Add a new project
  const addProject = async (event: React.FormEvent) => {
    event.preventDefault();
    if (title && description) {
      const newProject = { title, description };
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
        });

        if (response.ok) {
          setProjects([...projects, newProject]);
          setTitle('');
          setDescription('');
        } else {
          console.error('Error saving project:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>Ahmad Yahya</h1>
        <p>Web Developer & Designer</p>
        <nav>
          <a href="#profil">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <section id="profil">
        <h2>Profil</h2>
        <p>
          Effektiv, sosial og fleksibel, ansvarsbevisst, har evnen til å kunne
          tilpasse meg situasjoner og arbeidsmiljø på kort tid og lærer veldig
          raskt.
        </p>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>SQL</li>
        </ul>
      </section>

      <Projects />

      <section id="contact">
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:Ahmad.Yahya@hiof.no">Ahmad.Yahya@hiof.no</a>
        </p>
        <p>
          Github:{' '}
          <a
            href="https://github.com/A-M-89/Ahmadyahya89.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahmad Yahya Github
          </a>
        </p>

      </section>

      <footer>
        <p>&copy; 2024 Ahmad Yahya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
