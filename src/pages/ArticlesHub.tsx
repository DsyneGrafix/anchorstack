import React from 'react';

const ArticlesHub: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Creator Articles</h1>
      <ul className="space-y-4">
        <li>
          <h2 className="text-xl font-semibold">How to Focus in a Noisy World</h2>
          <p className="text-gray-600 dark:text-gray-300">Read this if you're drowning in digital distractions.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Why Faith-Focused Productivity Works</h2>
          <p className="text-gray-600 dark:text-gray-300">Scripture + systems = powerful clarity.</p>
        </li>
      </ul>
    </div>
  );
};

export default ArticlesHub;

