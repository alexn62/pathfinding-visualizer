const STARTMARKER = '🧍‍♂️';
const TARGETMARKER = '🎯';
const EMPTYFIELD = ' ';
const TOUCHEDFIELD = '🟡';
const VISITEDFIELD = '🟢';
const SHORTESTPATH = '🔴';
const WALL = '⬜️';

function setWalls(maze, start, target) {
  let wallCount = (maze.length * maze.length) / 3;
  while (wallCount > 0) {
    const coords = [getRandomInt(maze.length), getRandomInt(maze.length)];
    if ((coords[0] === start[0] && coords[1] === start[1]) || (coords[0] === target[0] && coords[1] === target[1])) {
      continue;
    }
    maze[coords[0]][coords[1]] = WALL;
    wallCount--;
  }
  return maze;
}

function drawFinish(position, storage, maze, startingPosition) {
  const minDistance = storage[position].distance;
  maze[position[0]][position[1]] = SHORTESTPATH;
  let closest = findNeighborClosestToStart(position, minDistance - 1, storage, maze.length);
  return [closest[0], maze];
}

function findNeighborClosestToStart(current, targetDistance, storage, size) {
  let [row, column] = current;

  //left
  let leftNeighbor = column === 0 ? null : [[row, column - 1], storage[[row, column - 1]]];

  // top
  let topNeighbor = row === 0 ? null : [[row - 1, column], storage[[row - 1, column]]];
  // right
  let rightNeighbor = column === size - 1 ? null : [[row, column + 1], storage[[row, column + 1]]];
  // bottom
  let bottomNeighbor = row === size - 1 ? null : [[row + 1, column], storage[[row + 1, column]]];

  for (let neighbor of [leftNeighbor, topNeighbor, rightNeighbor, bottomNeighbor]) {
    if (neighbor && neighbor[1].distance === targetDistance) {
      // console.log('found');
      return neighbor;
    }
  }
}

function explore(maze, storage, startingPosition, targetPosition, queue) {
  let current = queue[0];
  if (current[0] === targetPosition[0] && current[1] === targetPosition[1]) {
    return 'Finished';
  }

  const unvisitedNeighbors = findUnvisitedNeighbors(maze.length, storage, ...current);

  for (let neighbor of unvisitedNeighbors) {
    storage[neighbor[0]].distance = Math.min(storage[neighbor[0]].distance, storage[current].distance + 1);

    maze[neighbor[0][0]][neighbor[0][1]] = TOUCHEDFIELD;
  }

  // mark current as visited
  if (!(current[0] === startingPosition[0] && current[1] === startingPosition[1])) {
    console.log('not starting pos');
    maze[current[0]][current[1]] = VISITEDFIELD;
  }
  storage[current].visited = true;
  queue.shift();
  // console.table(unvisitedNeighbors);
  for (let neighbor of unvisitedNeighbors) {
    if (!storage[neighbor[0]].inQueue) {
      storage[neighbor[0]].inQueue = true;
      queue.push(neighbor[0]);
    }
  }
  return [...maze];
}

function findUnvisitedNeighbors(size, storage, row, column) {
  let result = [];
  let leftNeighbor;
  let topNeighbor;
  let rightNeighbor;
  let bottomNeighbor;

  // left
  leftNeighbor =
    column === 0 || storage[[row, column - 1]].visited || storage[[row, column - 1]].wall
      ? null
      : [[row, column - 1], storage[[row, column - 1]]];
  // top
  topNeighbor =
    row === 0 || storage[[row - 1, column]].visited || storage[[row - 1, column]].wall
      ? null
      : [[row - 1, column], storage[[row - 1, column]]];
  // right
  rightNeighbor =
    column === size - 1 || storage[[row, column + 1]].visited || storage[[row, column + 1]].wall
      ? null
      : [[row, column + 1], storage[[row, column + 1]]];
  // bottom
  bottomNeighbor =
    row === size - 1 || storage[[row + 1, column]].visited || storage[[row + 1, column]].wall
      ? null
      : [[row + 1, column], storage[[row + 1, column]]];

  for (let neighbor of [leftNeighbor, topNeighbor, rightNeighbor, bottomNeighbor]) {
    if (neighbor) {
      result.push(neighbor);
    }
  }
  return result;
}

function setupBoard(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < n; j++) {
      matrix[i].push(EMPTYFIELD);
    }
  }
  return matrix;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function placeRandomStartAndTarget(maze) {
  const start = [getRandomInt(maze.length), getRandomInt(maze.length)];
  const target = [getRandomInt(maze.length), getRandomInt(maze.length)];
  maze[start[0]][start[1]] = STARTMARKER;
  maze[target[0]][target[1]] = TARGETMARKER;
  return [
    [start[0], start[1]],
    [target[0], target[1]],
  ];
}

export {
  setupBoard,
  setWalls,
  placeRandomStartAndTarget,
  STARTMARKER,
  TARGETMARKER,
  EMPTYFIELD,
  TOUCHEDFIELD,
  VISITEDFIELD,
  SHORTESTPATH,
  WALL,
  explore,
  drawFinish,
};
