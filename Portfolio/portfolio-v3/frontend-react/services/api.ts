// services/api.ts
import { Project } from '../components/projects';
import config from '../config';

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/projects`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }

    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function addProject(newProject: Project): Promise<Project[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    const updatedProjects = await response.json();

    if (!Array.isArray(updatedProjects)) {
      throw new Error('Unexpected data format');
    }

    return updatedProjects;
  } catch (error) {
    console.error('Error submitting project:', error);
    throw error;
  }
}
