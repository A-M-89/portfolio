// App.tsx
import React from 'react';
import { useProjects } from '../hooks/useProjects';
import Projects from '../components/projects';
import './App.css';

const App: React.FC = () => {
  const { 
    projects, 
    title, 
    setTitle, 
    description, 
    setDescription, 
    category, 
    setCategory, 
    handleSubmit 
  } = useProjects();

  return (
    <div>
      <header>
        <h1>Ahmad Yahya</h1>
        <p>Web Developer & Designer</p>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
    <li>
      <a href="https://en.wikipedia.org/wiki/HTML" target="_blank" rel="noopener noreferrer">
        HTML/CSS
      </a>
    </li>
    <li>
      <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" rel="noopener noreferrer">
        JavaScript
      </a>
    </li>
    <li>
      <a href="https://en.wikipedia.org/wiki/SQL" target="_blank" rel="noopener noreferrer">
        SQL
      </a>
    </li>
  </ul>
</section>


      <p>Legg til ny prosjekt</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Project</button>
      </form>

      <Projects projects={projects} />

      <section id="contact">
        <h2>Contact</h2>
        <p>
          Email:{' '}
          <a href="mailto:Ahmad.Yahya@hiof.no">Ahmad.Yahya@hiof.no</a>
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
        <form>
          <label htmlFor="input">Message:</label>
          <input type="text" id="input" placeholder="Type your message here..." />
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
