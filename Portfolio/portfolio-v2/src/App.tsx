import Header from '../components/Header';
import Experience from '../components/Experiences';
import Contact from '../components/Contact';
import Projects from '../components/Projects';

function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Figma UI for customer X'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  return (
    <div>
      <Header name={student} degree={degree} points={points} />
      <Experience experienceOne={experienceOne} experienceTwo={experienceTwo} />
      <Contact email={email} />
      <br></br>
      <h1>Projects: </h1>
      <Projects/>
    </div>
  )
}

export default App