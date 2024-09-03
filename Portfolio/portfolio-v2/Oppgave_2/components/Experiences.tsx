type ExperienceProps = {
  experiences: {
    id: string;
    description: string;
  }[];
};

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section>
      <h2>Experiences:</h2>
      {experiences.map((experience) => (
        <p key={experience.id}>{experience.description}</p>
      ))}
    </section>
  );
}
