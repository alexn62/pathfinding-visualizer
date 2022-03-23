const helper = require('./maze');

function explore(maze, start, target, queue) {
  const current = queue[0];
  if (current === target) {
    return 'Finished';
  }

  const unvisitedNeighbors = helper.findUnvisitedNeighbors(maze, current);

  for (let neighbor of unvisitedNeighbors) {
    neighbor.distance = Math.min(neighbor.distance, current.distance + 1);

    neighbor.touched = true;
  }

  // mark current as visited
  if (current !== start) {
    console.log('not starting pos');
    current.visited = true;
  }
  current.visited = true;
  queue.shift();
  // console.table(unvisitedNeighbors);
  for (let neighbor of unvisitedNeighbors) {
    if (!neighbor.inQueue) {
      neighbor.inQueue = true;
      queue.push(neighbor);
    }
  }
  return [...maze];
}


export default explore;