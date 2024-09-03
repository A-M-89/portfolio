type ProjectProps = {
    id: string;
    name: string;
    description: string;
  };
  
  export default function Project({ name, description }: ProjectProps) {
    return (
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }
  
  