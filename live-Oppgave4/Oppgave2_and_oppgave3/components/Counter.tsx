// Startkode
import { useState } from 'react';

const Counter = () => {
const [count, SetCount] = useState(0);

const increase = () => {
    SetCount(count + 1);
}

const decrease = () => {
    SetCount(count - 1);
}

const nullStill = () => {
    SetCount(0)
}

  return (
    <div>
      <h2>Verdien er:  {count}</h2>
      <button onClick={increase}>Øk</button>
      <button onClick={decrease}>Reduser</button>
      <button onClick={nullStill}>Nullstille</button>
    </div>
  );
};

export default Counter;
