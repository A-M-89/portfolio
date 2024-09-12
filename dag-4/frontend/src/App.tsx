import { useState } from "react";
import Card from "./components/Card";


function App() {

  const [userName, setUserName] = useState("Ahmad")

  const changeUserName = () => {
    setUserName(prev => prev + 1)
  }

  const produkter = [
    {
      id: 1,
      title: 'CardTitle',
      description: 'CardDescription'
    },

    {
      id :2,
      title: 'CardTitleTwo',
      description: 'CardDescriptionTwo'
    }
  ]

  return (
    <section>

      <p>{userName}</p>
      <button onClick={changeUserName}> Logg ut</button>
      {
        produkter?.map(produkt => <Card key={produkt.id} title={produkt.title} description={produkt.description}/>)
      }

    </section>
  ); 
}

export default App
