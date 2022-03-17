import React from 'react';

const NavBar = ({ pause , run, restart}) => {
  return (
    <div className='p-10 flex flex-row justify-center '>
      <button className="border-2 w-20 bg-white mx-4 rounded-full" onClick={pause}>
        Pause
      </button>
      <button className="border-2 w-20 bg-white mx-4 rounded-full" onClick={run}>
        Run
      </button>
      <button className="border-2 w-20 bg-white mx-4 rounded-full" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

export default NavBar;
