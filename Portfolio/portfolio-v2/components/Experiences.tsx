type Experience = {
    experienceOne : string;
    experienceTwo: string;
  };
  
  export default function Experience(props: Experience) {
    return (
      <>
        <h2><p>The First Experience: {props.experienceOne}!.</p></h2>
        <h2><p>The Second Experience: {props.experienceTwo}!.</p></h2>
      </>
    );
  }