import React from 'react';

const NavBar = ({ pause, run, restart }) => {
  return (
    <div className="p-10 flex flex-row justify-center items-center">
      <NavBarButton title={'Dijsktra'} onClick={() => {}} selected={true}></NavBarButton>
      <NavBarButton title={'A*'} onClick={() => {}} selected={false}></NavBarButton>
      <div className="md:flex md:flex-row">
        <div className="italic bold text-xl text-pink-500 p-1">PATHFINDING</div>
        <h1 className="top-5 italic text-lg text-yellow-300 p-1">VISUALIZER</h1>
      </div>
      <NavBarButton title={'l l'} onClick={pause}></NavBarButton>
      <NavBarButton title={'▶️'} onClick={run}></NavBarButton>
      <NavBarButton title={'Restart'} onClick={restart}></NavBarButton>
    </div>
  );
};

export default NavBar;

const NavBarButton = ({ title, onClick, selected = true }) => {
  return (
    <button
      className={`w-20 max-h-8  mx-2 rounded-lg ${
        selected ? 'bg-yellow-400 hover:bg-yellow-200' : 'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500/20'
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
