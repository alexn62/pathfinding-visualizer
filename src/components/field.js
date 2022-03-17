import React from 'react';
import { SHORTESTPATH, STARTMARKER, TARGETMARKER, TOUCHEDFIELD, VISITEDFIELD, WALL } from '../utils/maze';

const Field = ({ matrix }) => {
  // let [rows, setRows] = useState([]);
  let tempRows = [];
  // console.table(matrix)
  for (let i = 0; i < matrix?.length; i++) {
    let row = [];
    for (let j = 0; j < matrix?.length; j++) {
      row.push(
        <div
          key={[i, j]}
          className={`h-2 w-2 md:w-3 md:h-3 lg:w-5 lg:h-5 ${
            matrix[i][j] === WALL
              ? 'bg-black'
              : matrix[i][j] === SHORTESTPATH
              ? 'bg-orange-500'
              : matrix[i][j] === STARTMARKER
              ? 'bg-green-500'
              : matrix[i][j] === TARGETMARKER
              ? 'bg-red-500'
              : matrix[i][j] === VISITEDFIELD
              ? 'bg-purple-400'
              : matrix[i][j] === TOUCHEDFIELD
              ? 'bg-pink-500'
              : 'bg-gray-400'
          }`}
        ></div>
      );
    }
    tempRows.push(
      <div key={i} className="flex flex-row">
        {row}
      </div>
    );
  }
  // setRows(tempRows)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border-8 border-black w-min">{tempRows}</div>
    </div>
  );
};

export default Field;
