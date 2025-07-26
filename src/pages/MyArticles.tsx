import React from 'react';

const MyArticles = () => {
  return (
    <div className="p-6">
      <header className="text-center text-2xl font-bold mb-4">📝 My Articles</header>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <button className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded">Productivity</button>
        <button className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded">Faith</button>
        <button className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded">Linux</button>
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="border p-4 rounded shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Sample Article 1</h2>
          <p>Intro to clarity-driven productivity systems with simple daily habits.</p>
        </article>
        <article className="border p-4 rounded shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Sample Article 2</h2>
          <p>Using a Linux setup for focused creative work and distraction-free flow.</p>
        </article>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-gray-100 px-4 py-2 shadow-md">
        <audio controls className="w-full">
          <source src="/sample.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MyArticles;

