import data from './data.js';
import React, { useState } from 'react';

const App = () => {
  const [names, setNames] = useState(data);

  function startRaffle(){
    if(names.length <= 1){
      return
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
  }
  return (
    <div>
      <button onClick={startRaffle}>
        Start Raffle
      </button>
      {names.map((names, index) => (
        <div key={index}>
          <ul>
          <li>{names.name}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App