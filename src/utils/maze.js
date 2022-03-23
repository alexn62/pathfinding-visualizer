function setupBoard(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < n; j++) {
      matrix[i].push({
        pos: { row: i, col: j },
        f: Infinity,
        g: Infinity,
        h: undefined,
        visited: false,
        touched: false,
        distance: Infinity,
        // sign: EMPTYFIELD,
        shortestPath: false,
        start: false,
        end: false,
        inQueue: false,
      });
    }
  }
  return matrix;
}

function setWalls(maze, start, target) {
  let wallCount = (maze.length * maze.length) / 3;
  while (wallCount > 0) {
    const coords = [getRandomInt(maze.length), getRandomInt(maze.length)];
    if (
      (coords[0] === start.pos.row && coords[1] === start.pos.col) ||
      (coords[0] === target.pos.row && coords[1] === target.pos.col)
    ) {
      continue;
    }
    maze[coords[0]][coords[1]].wall = true;
    wallCount--;
  }
  return maze;
}

function getNeighbors(maze, current) {
  let { row, col } = current.pos;

  //left
  let leftNeighbor = col === 0 ? null : maze[row][col - 1];

  // top
  let topNeighbor = row === 0 ? null : maze[row - 1][col];
  // right
  let rightNeighbor = col === maze.length - 1 ? null : maze[row][col + 1];
  // bottom
  let bottomNeighbor = row === maze.length - 1 ? null : maze[row + 1][col];

  return [leftNeighbor, topNeighbor, rightNeighbor, bottomNeighbor].filter((neighbor) => neighbor !== null && !neighbor.wall);
}

function findNeighborClosestToStart(current, targetDistance, maze) {
  let neighbors = getNeighbors(maze, current);
  for (let neighbor of neighbors) {
    if (neighbor.distance === targetDistance) {
      return neighbor;
    }
  }
}

function findUnvisitedNeighbors(maze, current) {
  let result = [];
  for (let neighbor of getNeighbors(maze, current)) {
    if (neighbor.visited === false) {
      result.push(neighbor);
    }
  }
  return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function placeRandomStartAndTarget(maze) {
  const startCoords = [getRandomInt(maze.length), getRandomInt(maze.length)];
  const targetCoords = [getRandomInt(maze.length), getRandomInt(maze.length)];
  const start = maze[startCoords[0]][startCoords[1]];
  start.start = true;
  start.distance = 0;
  const target = maze[targetCoords[0]][targetCoords[1]];
  target.end = true;
  return [start, target];
}

function drawFinish(position, maze) {
  const minDistance = position.distance;
  position.shortestPath = true;
  let closest = findNeighborClosestToStart(position, minDistance - 1, maze);
  return [closest, maze];
}

export { setupBoard, setWalls, placeRandomStartAndTarget, drawFinish, findUnvisitedNeighbors , getNeighbors};
