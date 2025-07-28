// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import FocusTimer from '@/components/FocusTimer';
import QuickNotes from '@/components/QuickNotes';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-[#3B82A7]">Welcome to AnchorStack</h1>
      <p className="text-lg text-[#7B8D92] mb-10">
        Your creator operating system for focused work and intentional building.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-[#3B82A7]">🕰️ Focus Timer</h2>
        <FocusTimer />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-[#3B82A7]">📝 Quick Notes</h2>
        <QuickNotes />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#3B82A7]">📦 Product Vault</h2>
        <p className="text-[#7B8D92] mb-4">
          Explore powerful tools and templates to help you stay focused and build momentum.
        </p>
        <Link to="/vault" className="inline-block bg-[#CA6B6E] text-white px-6 py-3 rounded-xl shadow hover:bg-[#B85052] transition">
          Enter the Vault
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

