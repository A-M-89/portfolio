import Project from './Project';

type ProjectType = {
  title: string;
  description: string;
};

export default function Projects() {
  // Definer fire statiske prosjekter som objekter
  const project1: ProjectType = { title: 'Project A', description: 'description A' };
  const project2: ProjectType = { title: 'Project B', description: 'description B' };
  const project3: ProjectType = { title: 'Project C', description: 'description C' };
  const project4: ProjectType = { title: 'Project D', description: 'description D' };
 

  return (
    <>
      <Project Project={project1} />
      <Project Project={project2} />
      <Project Project={project3} />
      <Project Project={project4} />
    </>
  );
}
