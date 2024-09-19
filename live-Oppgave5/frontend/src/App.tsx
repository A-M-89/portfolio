import Grid from "./components/Grid";


const students = [
  { id: "1", name: "Ahmad Yahya" },
  { id: "2", name: "Kari Normann" },
];

function App() {
  return (
    <main>
      <Grid students={students} />
    </main>
  );
}

export default App;