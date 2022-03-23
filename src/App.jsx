import './App.css';
import { useEffect, useRef, useState } from 'react';
import { placeRandomStartAndTarget, setupBoard, setWalls, drawFinish } from './utils/maze';
import explore from './utils/dijkstra';
import { astarNextStep } from './utils/astar';
import Field from './components/field';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';

function App() {
  let [maze, setMaze] = useState();
  let [selectDijkstra, setSelecDijkstra] = useState(true);
  let runner = useRef();
  let queue = useRef([]);
  let initialMaze = useRef();
  let starting = useRef();
  let target = useRef();
  let open = useRef([]);
  let closed = useRef([]);
  const start = () => {
    initialMaze.current = setupBoard(40);
    [starting.current, target.current] = placeRandomStartAndTarget(initialMaze.current);
    setWalls(initialMaze.current, starting.current, target.current);
    queue.current = [];
    open.current = [];
    closed.current = [];
    queue.current.push(starting.current);
    open.current.push(starting.current);
    setMaze(initialMaze.current);
  };

  useEffect(() => {
    start();
  }, []);

  const runFinish = () => {
    let current = target.current;
    let finalMaze;
    while (current !== starting.current) {
      let [newClosest, newMaze] = drawFinish(current, maze);
      current = newClosest;
      finalMaze = newMaze;
    }
    setMaze(finalMaze);
  };

  const nextStep = () => {
    try {
      let newMaze = selectDijkstra
        ? explore(maze, starting.current, target.current, queue.current)
        : astarNextStep(target.current, open.current, closed.current, maze);

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
    if (!runner.current) {
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

  const select = () => {
    if (runner.current) {
      return;
    }
    setSelecDijkstra(!selectDijkstra);
  };

  return (
    <Wrapper>
      <NavBar
        select={() => select()}
        pause={() => {
          clear();
        }}
        run={() => {
          resume();
        }}
        restart={() => {
          restart();
        }}
        selectDijkstra={selectDijkstra}
      ></NavBar>

      <Field matrix={maze}></Field>
    </Wrapper>
  );
}

export default App;
