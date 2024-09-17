import { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash/shuffle';
import Confetti from 'react-confetti';

import jsonData from './data.json'; // Assuming your JSON file is named 'data.json'
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [windowHeight, setWindowHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wraffling, setWraffling] = useState(false);
  const confettiWrapper = useRef(null);
  const height = 60;

  // Function to extract names from JSON data (filtering empty full_name fields)
  const getFullNames = (data) => {
    return data.items
      .map(item => item.full_name)
      .filter(name => name.trim() !== "");  // Filter out empty names
  };

  // Set names when component is mounted
  useEffect(() => {
    const fullNamesList = getFullNames(jsonData.data);  // Extract full names from jsonData
    setNames(fullNamesList);  // Set the state with the extracted names
  }, []);

  const transitions = useTransition(
    names.map((data, i) => ({ name: data, y: 0.5 * i })), // Adjusted to map full names
    (d) => d.name,
    {
      from: { position: 'initial', opacity: 0 },
      leave: {
        height: height - (height * 0.2),
        opacity: 0,
      },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
    }
  );

  function startRaffle() {
    if (names.length <= 1) {
      setWraffling(true);
      setShowConfetti(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
    setInitialLoad(true);
  }

  function restartRaffle() {
    setInitialLoad(false);
    setNames(getFullNames(jsonData.data));  // Reset names to the initial list
    setWraffling(false);
    setShowConfetti(false);
  }

  useEffect(() => {
    if (initialLoad) {
      const filteringTimer = setTimeout(() => {
        startRaffle();
      }, 700);
      return () => {
        clearTimeout(filteringTimer);
      };
    }
  }, [initialLoad, names, startRaffle]);

  useEffect(() => {
    setWindowHeight(confettiWrapper.current.clientHeight);
    setWindowWidth(confettiWrapper.current.clientWidth);
  }, []);

  return (
    <div className="container" ref={confettiWrapper}>
      <div className="raffle-header">
        
        {!initialLoad && (
          <div className="raffle-header__buttons">
            <button className="button-primary" onClick={startRaffle}>
              Start Raffle
            </button>
            <button
              className="button-outline"
              onClick={() => setNames(shuffle(names))}
            >
              Shuffle
            </button>
          </div>
        )}
      </div>
      {wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={80}
          width={windowWidth}
          height={windowHeight}
        />
      )}
      <div className="raffle-names">
        {transitions.map(({ item, props: { y, ...rest }, index }) => (
          <animated.div
            className="raffle-listnames"
            key={index}
            style={{
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
              ...rest
            }}
          >
            <div className="raffle-namelist">
              <span>{item.name}</span> {/* Display full name */}
            </div>
          </animated.div>
        ))}
      </div>
      <div>
        {showConfetti && (
          <div className="raffle-ends">
            <h3>Congratulations! You have won the raffle!</h3>
            <button className="button-outline" onClick={restartRaffle}>
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
