import React from 'react';

const NavBar = ({ pause, run, restart }) => {
  return (
    <div className="p-10 flex flex-row justify-center items-center">
      <div className='md:flex md:flex-row'>

      <div className='italic bold text-2xl text-pink-500 p-1'>DIJKSTRA 
      </div>
        <h1 className="top-5 italic text-2xl text-yellow-300 p-1">VISUALIZER</h1>
      </div>
      <button className="border-2 w-20 max-h-8 bg-white mx-2 rounded-lg" onClick={pause}>
        Pause
      </button>
      <button className="border-2 w-20 max-h-8 bg-white mx-2 rounded-lg" onClick={run}>
        Run
      </button>
      <button className="border-2 w-20 max-h-8 bg-white mx-2 rounded-lg" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

export default NavBar;
