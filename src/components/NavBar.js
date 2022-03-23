import React from 'react';

const NavBar = ({ pause, run, restart, select, selectDijkstra }) => {
  return (
    <div className="flex flex-col">
      <div className="p-1 flex flex-row justify-center items-center">
        <NavBarButton title={'Dijsktra'} onClick={select} selected={selectDijkstra}></NavBarButton>
        <NavBarButton title={'A*'} onClick={select} selected={!selectDijkstra}></NavBarButton>
      </div>
      <div className="p-1 flex flex-row justify-center items-center">
          <div className="italic bold text-xl text-pink-500 p-1">PATHFINDING</div>
          <h1 className="top-5 italic text-lg text-yellow-300 p-1">VISUALIZER</h1>
      </div>
      <div className="p-1 flex flex-row justify-center items-center">
        <div className="md:flex md:flex-row">
        <NavBarButton title={'l l'} onClick={pause}></NavBarButton>
        <NavBarButton title={'▶️'} onClick={run}></NavBarButton>
        <NavBarButton title={'Restart'} onClick={restart}></NavBarButton>
        </div>
      </div>

    </div>
  );
};

export default NavBar;

const NavBarButton = ({ title, onClick, selected = true }) => {
  return (
    <button
      className={`w-20 max-h-8 mx-2 my-2 px-3 rounded-lg min-w-max ${
        selected
          ? 'bg-yellow-400 hover:bg-yellow-600'
          : 'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500/20'
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
