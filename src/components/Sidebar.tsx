import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: '🏠 Dashboard', to: '/' },
  { label: '📚 My Articles', to: '/myarticles' },
  { label: '🗂️ Vault', to: '/vault' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full md:w-64 h-full bg-gray-100 dark:bg-gray-900 p-4 sticky top-0">
<li>
  <a href="/articles" className="hover:underline">
    📝 Articles
  </a>
</li>

      <h2 className="text-xl font-bold mb-6 text-blue-600">AnchorStack</h2>
      <ul className="space-y-3">
        {links.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className={`block px-3 py-2 rounded ${
                location.pathname === to
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

