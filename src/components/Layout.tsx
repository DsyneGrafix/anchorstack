import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <nav>
          <Link to="/">🏠 Home</Link> | <Link to="/about">📖 About</Link> | <Link to="/vault">🧰 Vault</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

