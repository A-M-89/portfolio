import React, { useState } from 'react';


type SchoolSystemProps = {
  name: string;
  teacher: string;
};

const SchoolSystem: React.FC<SchoolSystemProps> = ({ name, teacher }) => {
  const [students, setStudents] = useState<{ id: number; name: string; teacher: string }[]>([]);

  const newStudent = () => {
    const newId = students.length + 1; 
    const student = {
      id: newId, 
      name: name || `Student ${newId}`,
      teacher: teacher || `Teacher ${newId}`
    };
    setStudents([...students, student]);
  };

  const removeStudent = () => {
    setStudents(students.slice(0, -1)); 
  };

  const nullStill = () => {
    setStudents([]); 
  };

  return (
    <div>
      <h2>Antall i listen: {students.length}</h2>
      <button onClick={newStudent}>Legg til i listen</button>
      <button onClick={removeStudent}>Fjern siste fra listen</button>
      <button onClick={nullStill}>Tøm listen</button>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Lærer: {student.teacher}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolSystem;
