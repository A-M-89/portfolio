import React from 'react'

// Define the type for a single project
export type Project = {
  id: number
  title: string
  description: string
  createdAt: string
  category: string
}

// Define the prop types for the Projects component
type ProjectsProps = {
  projects: Project[] // Ensure projects is always an array
}

// Define the Projects component that accepts props
const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p>No projects available.</p> // Handle the case where projects is an empty array
  }

  return (
    <section id="projects">
      <h2>Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>Title: {project.title}</h3>
            <p>Description: {project.description}</p>
            <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
            <p>Category: {project.category}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
