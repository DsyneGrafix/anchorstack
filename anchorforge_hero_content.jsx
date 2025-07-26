// Faith-Based Hero Block (React + Tailwind)

export default function AnchorForgeHero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          🔨 AnchorForge
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-300">
          Where Calling Meets Craft
        </h2>
        <p className="text-lg sm:text-xl italic text-gray-600 dark:text-gray-400 mb-6">
          “Write the vision; make it plain on tablets, so he may run who reads it.” — Habakkuk 2:2
        </p>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8">
          Built for modern-day scribes, soul-driven creatives, and kingdom-minded entrepreneurs, <strong>AnchorForge</strong> is your personal content engine. Whether you're crafting a devotional, launching a clarity toolkit, or equipping others through your gifts — this isn’t just publishing. This is <strong>purpose, refined</strong>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#start" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold">
            ✍️ Start Forging
          </a>
          <a href="#origin" className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-lg font-medium">
            📖 Learn the Origin
          </a>
        </div>
      </div>
    </section>
  );
}
