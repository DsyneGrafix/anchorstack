import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VaultPage from './pages/VaultPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}
