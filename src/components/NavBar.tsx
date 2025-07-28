import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-[#3B82A7] text-white px-6 py-3 shadow-md rounded-b-2xl">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">⚓ AnchorStack</h1>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/focus" className="hover:underline">Focus</Link>
          <Link to="/notes" className="hover:underline">Notes</Link>
          <Link to="/vault" className="hover:underline">Vault</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

