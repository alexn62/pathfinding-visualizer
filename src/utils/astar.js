const EMPTYFIELD = '-';
const VISITEDFIELD = '🟩';
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
        sign: EMPTYFIELD,
      });
    }
  }
  return matrix;
}
console.table(setupBoard(10).map((e) => e.map((el) => el.sign)));

const findNeighbors = (maze, currentNode) => {
  let res = [];
  let row = currentNode.pos.row;
  let column = currentNode.pos.col;

  if (maze[row - 1] && maze[row - 1][column]) {
    res.push(maze[row - 1][column]);
  }
  if (maze[row + 1] && maze[row + 1][column]) {
    res.push(maze[row + 1][column]);
  }
  if (maze[row][column - 1] && maze[row][column - 1]) {
    res.push(maze[row][column - 1]);
  }
  if (maze[row][column + 1] && maze[row][column + 1]) {
    res.push(maze[row][column + 1]);
  }
  return res;
};

const heuristic = (pos0, pos1) => {
  let d1 = Math.abs(pos1.row - pos0.row);
  let d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
};

const astar = (maze, start, end) => {
  maze[start.pos.row][start.pos.col].sign = '🟨';
  maze[end.pos.row][end.pos.col].sign = '🔴';

  const open = [];
  const closed = [];
  start.g = 0;
  open.push(start);

  while (open.length) {
    console.table(maze.map((e) => e.map((el) => el.sign)));

    let lowestFIndex = 0;
    for (let i = 0; i < open.length; i++) {
      if (lowestFIndex === undefined || open[i].f < open[lowestFIndex].f) {
        lowestFIndex = i;
      }
    }
    // console.log(open);
    // console.log(lowestFIndex);
    // console.log(open[lowestFIndex]);
    let currentNode = open[lowestFIndex];
    if (currentNode.pos === end.pos) {
      return;
    }
    const toDelete = open.indexOf(currentNode);
    // console.log(open)
    open.splice(toDelete, 1);
    // console.log(open)

    currentNode.sign = VISITEDFIELD;
    closed.push(currentNode);

    // console.log(closed)
    let neighbors = findNeighbors(maze, currentNode);
    // console.log(neighbors)
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (closed.includes(neighbor)) {
        continue;
      }

      let gScore = currentNode.g + 1;
      let gScoreBest = false;

      if (!open.includes(neighbor)) {
        gScoreBest = true;
        neighbor.h = heuristic(neighbor.pos, end.pos);
        open.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreBest = true;
      }
      if (gScoreBest) {
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
      console.table(maze.map((e) => e.map((el) => el.f)));
    }
  }
};

const maze = setupBoard(10);
const start = maze[1][1];
const end = maze[8][1];
astar(maze, start, end);
