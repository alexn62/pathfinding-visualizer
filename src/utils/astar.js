import { getNeighbors } from './maze';


const heuristic = (pos0, pos1) => {
  let d1 = Math.abs(pos1.row - pos0.row);
  let d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
};

const astarNextStep = (end, open, closed, maze) => {
  let lowestFIndex = 0;
  for (let i = 0; i < open.length; i++) {
    if (lowestFIndex === undefined || open[i].f < open[lowestFIndex].f) {
      lowestFIndex = i;
    }
  }
  
  let currentNode = open[lowestFIndex];
  if (currentNode.pos === end.pos) {
    return 'Finished';
  }
  const toDelete = open.indexOf(currentNode);
  
  open.splice(toDelete, 1);
  

  currentNode.visited = true;
  closed.push(currentNode);

  let neighbors = getNeighbors(maze, currentNode);
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
  }
  return [...maze];
};

// mostly adapted from https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/

export { astarNextStep };
