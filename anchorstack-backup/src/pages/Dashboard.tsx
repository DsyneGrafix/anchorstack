import React, { useState, useEffect } from 'react';
import FocusTimer from '../components/FocusTimer';
import QuickNotes from '../components/QuickNotes'



const Dashboard: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "“Commit to the Lord whatever you do, and He will establish your plans.” – Proverbs 16:3",
    "“In all your ways acknowledge Him, and He will make your paths straight.” – Proverbs 3:6",
    "“Be still, and know that I am God.” – Psalm 46:10",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 AnchorStack Dashboard</h1>
      <FocusTimer />
      <p className="mt-6 italic text-gray-600 dark:text-gray-300">
        {quotes[quoteIndex]}
      </p>
    </div>
  );
};

export default Dashboard;

