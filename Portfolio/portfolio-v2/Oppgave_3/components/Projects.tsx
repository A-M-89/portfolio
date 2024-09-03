import React from 'react';

type ProjectsProps = {
  children: React.ReactNode;
};

export default function Projects({ children }: ProjectsProps) {
  return (
    <section>
      <h2>Projects:</h2>
      <div>{children}</div>
    </section>
  );
}

