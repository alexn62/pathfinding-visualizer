import './App.css';
import { useEffect, useRef, useState } from 'react';
import { placeRandomStartAndTarget, explore, setupBoard, setWalls, STARTMARKER, WALL, drawFinish } from './utils/maze';
import Field from './components/field';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';


function App() {
  let [maze, setMaze] = useState();
  let runner = useRef();
  let queue = useRef([]);
  let initialMaze = useRef();
  let startingPosition = useRef();
  let targetPosition = useRef();
  let storage = useRef();

  const start = () => {
    initialMaze.current = setupBoard(40);
    [startingPosition.current, targetPosition.current] = placeRandomStartAndTarget(initialMaze.current);
    setWalls(initialMaze.current, startingPosition.current, targetPosition.current);

    storage.current = {};
    for (let i = 0; i < initialMaze.current.length; i++) {
      for (let j = 0; j < initialMaze.current.length; j++) {
        const key = [i, j]; // [row, column]
        storage.current[key] =
          initialMaze.current[i][j] === STARTMARKER
            ? { distance: 0, visited: false, wall: false }
            : { distance: Infinity, visited: false, wall: initialMaze.current[i][j] === WALL };
      }
    }
    queue.current = [];
    queue.current.push(startingPosition.current);
    setMaze(initialMaze.current);
  };

  useEffect(() => {
    start();
  }, []);

  const runFinish = () => {
    let current = targetPosition.current;
    let finalMaze;
    while (!(current[0] === startingPosition.current[0] && current[1] === startingPosition.current[1])) {
      let [newClosest, newMaze] = drawFinish(current, storage.current, maze, startingPosition.current);
      current = newClosest;
      finalMaze = newMaze;
    }
    setMaze(finalMaze);
  };

  const nextStep = () => {
    try {
      let newMaze = explore(maze, storage.current, startingPosition.current, targetPosition.current, queue.current);
      if (newMaze === 'Finished') {
        runFinish();
        clear();
        return;
      }
      setMaze(newMaze);
    } catch {
      clear();
    }
  };

  const setupInterval = () => {
    console.log('Setting up interval');
    if (!runner.current) {
      console.log('No runner found, setting new.');
      runner.current = setInterval(nextStep, 10);
    }
  };

  const clear = () => {
    clearInterval(runner.current);
    runner.current = null;
  };

  const resume = () => {
    setupInterval();
  };

  const restart = () => {
    if (runner.current) {
      return;
    }
    start();
  };

  return (
    <Wrapper>
      <NavBar
        pause={() => {
          clear();
        }}
        run={() => {
          resume();
        }}
        restart={() => {
          restart();
        }}
      ></NavBar>

      <Field matrix={maze} storage={storage.current}></Field>
    </Wrapper>
  );
}

export default App;
