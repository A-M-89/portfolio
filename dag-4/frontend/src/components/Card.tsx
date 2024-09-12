import Title from "./Title";

type CardProps = {
    title: string;
    description: string;
  };
  
  export default function Card(props: CardProps) {
    const { title = "Title", description = "Description" } = props;
    return (
      <article>
        <Title title={title}/>
        <p>{description}</p>
      </article>
    );
  }