// src/components/MainLayout.jsx
import Sidebar from './Sidebar';
import Player from './Player';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex h-screen bg-light-blue"> 
      <Sidebar />
      <main className="flex-1 overflow-auto custom-scrollbar">
        <Outlet />
      </main>
      <Player />
    </div>
  );
}

export default MainLayout;
