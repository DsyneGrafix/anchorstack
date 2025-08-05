import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <nav>
          <a href="/">🏠 Home</a> | <a href="/about">📖 About</a> | <a href="/vault">🧰 Vault</a>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

