import { getNeighbors } from './maze';
// const findNeighbors = (maze, currentNode) => {
//   let res = [];
//   let row = currentNode.pos.row;
//   let column = currentNode.pos.col;

//   if (maze[row - 1] && maze[row - 1][column]) {
//     res.push(maze[row - 1][column]);
//   }
//   if (maze[row + 1] && maze[row + 1][column]) {
//     res.push(maze[row + 1][column]);
//   }
//   if (maze[row][column - 1] && maze[row][column - 1]) {
//     res.push(maze[row][column - 1]);
//   }
//   if (maze[row][column + 1] && maze[row][column + 1]) {
//     res.push(maze[row][column + 1]);
//   }
//   return res;
// };

const heuristic = (pos0, pos1) => {
  let d1 = Math.abs(pos1.row - pos0.row);
  let d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
};

// while (open.length) {
// console.table(maze.map((e) => e.map((el) => el.sign)));
const astarNextStep = (end, open, closed, maze) => {
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
    return 'Finished';
  }
  const toDelete = open.indexOf(currentNode);
  // console.log(open)
  open.splice(toDelete, 1);
  // console.log(open)

  currentNode.visited = true;
  closed.push(currentNode);

  // console.log(closed)
  let neighbors = getNeighbors(maze, currentNode);
  // console.log(neighbors)
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i];
    neighbor.touched = true;
    if (closed.includes(neighbor)) {
      continue;
    }

    let gScore = currentNode.distance + 1;
    let gScoreBest = false;

    if (!open.includes(neighbor)) {
      gScoreBest = true;
      neighbor.h = heuristic(neighbor.pos, end.pos);
      open.push(neighbor);
    } else if (gScore < neighbor.distance) {
      gScoreBest = true;
    }
    if (gScoreBest) {
      neighbor.distance = gScore;
      neighbor.f = neighbor.distance + neighbor.h;
    }
    // console.table(maze.map((e) => e.map((el) => el.f)));
    // }
  }
  return [...maze];
};

// const maze = setupBoard(10);
// const start = maze[1][1];
// const end = maze[8][1];
// astar(maze, start, end);

export { astarNextStep };
