import React from 'react';

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
          // className={`transition-all h-4 w-4
          className={`h-2 w-2 md:w-3 md:h-3 lg:w-4 lg:h-4 transition-all duration-200
           ${
             matrix[i][j].wall === true
               ? 'bg-black'
               : matrix[i][j].shortestPath === true
               ? 'bg-green-500'
               : matrix[i][j].start === true
               ? 'bg-green-500'
               : matrix[i][j].end === true
               ? 'bg-red-500'
               : matrix[i][j].visited === true
               ? 'bg-purple-400'
               : matrix[i][j].touched === true
               ? 'bg-pink-500'
               : 'bg-gray-400'
           }
          `}
        ></div>
      );
    }
    tempRows.push(
      <div key={i} className="flex flex-row w-full">
        {/* <div key={i} className="flex flex-row bg-red"> */}
        {row}
      </div>
    );
  }
  // setRows(tempRows)
  return (
    <div className="flex justify-center">
      {/* <div className="border-8 border-black">{tempRows}</div> */}
      <div className="flex flex-col items-center border-8 border-black w-min">{tempRows}</div>
    </div>
  );
};

export default Field;
