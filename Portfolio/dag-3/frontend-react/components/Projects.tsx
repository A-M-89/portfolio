import React, { useState, useEffect } from 'react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<{ id: number; title: string; description: string; createdAt: string; category: string }[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

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

  const addProject = async (event: React.FormEvent) => {
    event.preventDefault();
    if (title && description && category) {
      const newProject = {
        title,
        description,
        category
      };

      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
        });

        if (response.ok) {
          const addedProject = await response.json();
          setProjects([...projects, addedProject]);
          setTitle('');
          setDescription('');
          setCategory('');
        } else {
          console.error('Error saving project:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  };

  return (
    <section id="projects">
      <form onSubmit={addProject}>
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

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Category:</strong> {project.category}</p>
            <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
