import React from 'react';

const NavBar = ({ clear , start}) => {
  return (
    <div className='p-10'>
      <button className="border-2 w-20 bg-white rounded-full" onClick={clear}>
        Stop
      </button>
      <button className="border-2 w-20 bg-white rounded-full" onClick={start}>
        Start
      </button>
    </div>
  );
};

export default NavBar;
