import React from 'react'
import { Header } from '@/components/Header'
import QuickNotes from '@/components/QuickNotes'
import { VaultSection } from '@/components/VaultSection'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#202020] text-white px-4 py-6">
      <Header />

      <main className="mt-8 max-w-4xl mx-auto space-y-12">
        <section id="focus">
          <h2 className="text-2xl font-bold mb-4 text-[#4daaa8]">🎯 Focus Timer</h2>
          <p className="text-sm text-gray-300 mb-2">Refocus your time with intentional sprints.</p>
          <div className="border border-[#4daaa8] rounded p-4 bg-[#2a2a2a]">
            <p className="text-xl">⏱️ 25:00</p>
            <div className="mt-4 flex gap-4">
              <button className="bg-[#4daaa8] px-4 py-2 rounded">Start</button>
              <button className="bg-[#f4cd87] px-4 py-2 rounded">Reset</button>
            </div>
          </div>
        </section>

        <section id="notes">
          <h2 className="text-2xl font-bold mb-4 text-[#588bb5]">📝 Quick Notes</h2>
          <QuickNotes />
        </section>

        <section id="vault">
          <h2 className="text-2xl font-bold mb-4 text-[#df6f74]">🔓 Product Vault</h2>
          <VaultSection />
        </section>
      </main>
    </div>
  )
}

export default App

