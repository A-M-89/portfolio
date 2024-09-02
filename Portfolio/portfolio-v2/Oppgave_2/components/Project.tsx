type ProjectType = {
    title: string;
    description: string;
  };
  
  type ProjectProps = {
    Project: ProjectType; // Merk at navnet er `project` med liten bokstav
  };
  
  export default function Project({ Project }: ProjectProps) {
    return (
      <div>
        <h2>{Project.title}:</h2>
        <p>{Project.description}</p>
      </div>
    );
  }
  