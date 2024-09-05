import React, { useState, useEffect } from 'react';
import './App.css';
import Projects from '../components/Projects';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [projects, setProjects] = useState<{ title: string; description: string }[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && description) {
      const newProject = { title, description };
      setProjects([...projects, newProject]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>Ahmad Yahya</h1>
        <p>Web Developer & Designer</p>
        <nav>
          <a href="#profil">About  </a>
          <a href="#skills">Skills  </a>
          <a href="#projects">Projects  </a>
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
          Github:{" "}
          <a
            href="https://github.com/A-M-89/Ahmadyahya89.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahmad Yahya Github
          </a>
        </p>
        <form>
          <label htmlFor="input">Message:</label>
          <input
            type="text"
            id="input"
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 Ahmad Yahya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
