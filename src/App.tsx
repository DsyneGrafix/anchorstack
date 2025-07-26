import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = () => (
  <div className="text-center p-10">
    <h1 className="text-4xl font-bold mb-4">⚓ Welcome to AnchorStack</h1>
    <p className="text-lg text-gray-600">Clarity. Momentum. Creation — without the noise.</p>
    <div className="mt-8 space-x-4">
      <Link to="/vault" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">🗂 Vault</Link>
      <Link to="/courses" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">🎓 Courses</Link>
      <Link to="/nuggets" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">💡 Daily Nuggets</Link>
    </div>
  </div>
)

const Vault = () => <div className="p-10">📂 All your digital products will be listed here.</div>
const Courses = () => <div className="p-10">📚 Course listing page.</div>
const Nuggets = () => <div className="p-10">💡 Bite-sized wisdom drops.</div>

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">AnchorStack</h2>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/vault" className="hover:underline">Vault</Link>
            <Link to="/courses" className="hover:underline">Courses</Link>
            <Link to="/nuggets" className="hover:underline">Nuggets</Link>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/nuggets" element={<Nuggets />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
