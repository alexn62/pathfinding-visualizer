import './App.css';
import { useEffect, useRef, useState } from 'react';
import { placeRandomStartAndTarget, explore, setupBoard, setWalls, STARTMARKER, WALL, drawFinish } from './utils/maze';
import Field from './components/field';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';

let initialMaze;
let startingPosition;
let targetPosition;
let storage;
let queue = [];

function App() {
  let [maze, setMaze] = useState();
  let runner = useRef();
  // useEffect(() => {
  //   console.log('Runner changed', runner);
  // }, [runner]);

  const start = () => {
    initialMaze = setupBoard(40);
    [startingPosition, targetPosition] = placeRandomStartAndTarget(initialMaze);
    setWalls(initialMaze, startingPosition, targetPosition);

    storage = {};
    for (let i = 0; i < initialMaze.length; i++) {
      for (let j = 0; j < initialMaze.length; j++) {
        const key = [i, j]; // [row, column]
        storage[key] =
          initialMaze[i][j] === STARTMARKER
            ? { distance: 0, visited: false, wall: false }
            : { distance: Infinity, visited: false, wall: initialMaze[i][j] === WALL };
      }
    }
    queue = [];
    queue.push(startingPosition);
    setMaze(initialMaze);
  };

  useEffect(() => {
    start();
  }, []);

  const runFinish = () => {
    // console.log('Done');
    // clear();
    let current = targetPosition;
    let finalMaze;
    while (!(current[0] === startingPosition[0] && current[1] === startingPosition[1])) {
      let [newClosest, newMaze] = drawFinish(current, storage, maze, startingPosition);
      current = newClosest;
      finalMaze = newMaze;
    }
    setMaze(finalMaze);
  };

  const nextStep = () => {
    try {
      let newMaze = explore(maze, storage,startingPosition, targetPosition, queue);
      if (newMaze === 'Finished') {
        runFinish();
        clear();
        return;
      }
      setMaze(newMaze);
    } catch {
      console.error('Error');
    
      clear();
    }
  };

  const setupInterval = () => {
    console.log('Setting up interval');
    if (!runner.current) {
      console.log('No runner found, setting new.');
      runner.current = setInterval(nextStep, 15);
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

      <Field matrix={maze} storage={storage}></Field>
    </Wrapper>
  );
}

export default App;
