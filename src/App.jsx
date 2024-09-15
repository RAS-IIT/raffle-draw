import data from './data.js';
import React, { useState } from 'react';

const App = () => {
  const [names, setNames] = useState(data);
  return (
    <div>App</div>
  )
}

export default App