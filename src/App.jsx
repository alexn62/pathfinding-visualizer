import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { placeRandomStartAndTarget, explore, setupBoard, setWalls, STARTMARKER, WALL, drawFinish } from './utils/maze';
import Field from './components/field';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';

let initialMaze;
let startingPosition;
let targetPosition;
let storage;
let queue = [];

const start = () => {
  console.log('Running start');
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
};

start();

function App() {
  console.log('Render!');
  // console.table(initialMaze);

  let [maze, setMaze] = useState(initialMaze);
  const runFinish = () => {
    // console.log('Done');
    clear();
    let current = targetPosition;
    let finalMaze;
    while (!(current[0] === startingPosition[0] && current[1] === startingPosition[1])) {
      // while (i < 5) {
      // console.log('Running finishing sequence.');
      let [newClosest, newMaze] = drawFinish(current, storage, maze, startingPosition);
      current = newClosest;
      finalMaze = newMaze;
    }
    setMaze(finalMaze);
  };

  const nextStep = () => {
    // console.log('Next step');
    try {
      let newMaze = explore(maze, storage, targetPosition, queue);
      if (newMaze === 'Finished') {
        runFinish();
        return;
      }
      setMaze(newMaze);
    } catch {
      clear();
    }
  };

  const clear = useMemo(() => {
    let runner = setInterval(() => {
      nextStep();
    }, 10);
    return () => clearInterval(runner);
  }, []);

  const restart = () => {
    start();
    setMaze(initialMaze);
  };
  return (
    <Wrapper>
      <NavBar
        clear={() => {
          clear();
        }}
        start={() => {
          restart();
        }}
      ></NavBar>

      <Field matrix={maze} storage={storage}></Field>
    </Wrapper>
  );
}

export default App;
