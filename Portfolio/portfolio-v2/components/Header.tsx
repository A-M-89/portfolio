type Header = {
    name: String;
    degree : String;
    points: number;
}

export default function Header(props: Header) {
    return (
      <>
        <h2><p>Student name is: {props.name}!</p></h2>
        <h2><p>Degree is: {props.degree} </p></h2>
        <h2><p>Points is: {props.points} </p></h2>
      </>
    );
  }