import Header from '../components/Header';
import Experience from '../components/Experiences';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Project from '../components/Project';

function App() {
  const student = 'Halgeir Geirson';
  const degree = 'Bachelor IT';
  const points = 180;

  const experiences = [
    { id: 'exp1', description: 'Figma UI for customer X' },
    { id: 'exp2', description: 'Website for customer Y' },
  ];

  const projects = [
    { id: '1', name: 'Project A', description: 'Description of Project A' },
    { id: '2', name: 'Project B', description: 'Description of Project B' },
  ];

  const email = 'student@hiof.no';

  return (
    <div>
      <Header name={student} degree={degree} points={points} />

      {/* Experiences */}
      <Experience
        experiences={experiences.map((exp) => ({
          id: exp.id,
          description: exp.description,
        }))}
      />

      <Contact email={email} />

      <br />
      <Projects>
        {projects.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
          />
        ))}
      </Projects>
    </div>
  );
}

export default App;
