import React, { useState, useEffect } from 'react'
import Projects, { Project } from '../components/projects'
import "./App.css"


const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]) // Initialize as empty array
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((response) => response.json())
      .then((data) => {
        // Ensure the fetched data is an array
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          console.error('Unexpected data format', data)
          setProjects([])
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error)
        setProjects([])
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !category) return

    const newProject: Project = {
      id: Date.now(), // Generate a unique ID
      title,
      description,
      createdAt: new Date().toISOString(),
      category,
    }

    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      if (response.ok) {
        const updatedProjects = await response.json()
        if (Array.isArray(updatedProjects)) {
          setProjects(updatedProjects) // Update the project list
        }
        setTitle('')
        setDescription('')
        setCategory('')
      } else {
        console.error('Failed to add project')
      }
    } catch (error) {
      console.error('Error submitting project:', error)
    }
  }

  return (
    <div>
      <header>
        <h1>Ahmad Yahya</h1>
        <p>Web Developer & Designer</p>
        <nav>
          <a href="#about">About  </a>
          <a href="#skills">Skills  </a>
          <a href="#projects">Projects  </a>
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
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>SQL</li>
        </ul>
      </section>

      <p>Legg til ny projekt</p>

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

      {/* Pass projects as a prop */}
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
  )
}

export default App
