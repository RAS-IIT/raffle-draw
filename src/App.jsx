import data from './data.js';
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [names, setNames] = useState(data);
  const [initialLoad, setInitialLoad] = useState(false);

  function startRaffle(){
    if(names.length <= 1){
      return
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
    setInitialLoad(true);
  }

  useEffect(() => {
    if(initialLoad){
    const filteringTimer = setTimeout(() => {
      startRaffle();
    }, 1000);
    return() => clearTimeout(filteringTimer);
  }
  }, [names, startRaffle, initialLoad])

  return (
    <div>
      <button onClick={startRaffle}>Start Raffle</button>
      <button onClick={() => setNames(shuffle(names))}>Shuffle</button>
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