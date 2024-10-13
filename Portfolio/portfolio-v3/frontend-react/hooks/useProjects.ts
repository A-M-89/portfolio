// hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { fetchProjects, addProject } from '../services/api';
import { Project } from '../components/projects';
import { isNonEmptyString } from '../utils/validators';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNonEmptyString(title) || !isNonEmptyString(description) || !isNonEmptyString(category)) {
      console.error('All fields are required');
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
      category,
    };

    try {
      const updatedProjects = await addProject(newProject);
      setProjects(updatedProjects);
      setTitle('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return {
    projects,
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    handleSubmit,
  };
}
