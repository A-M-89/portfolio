import React, { useState, useEffect } from 'react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

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
    if (title && description && category) {
      const newProject = {
        id: Date.now(), 
        title,
        description,
        createdAt: new Date().toISOString(),
        category
      };
      setProjects([...projects, newProject]);
      setTitle('');
      setDescription('');
      setCategory('');
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
        {projects.map((project: any) => (
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
