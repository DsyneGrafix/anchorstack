import React from 'react'
import { Anchor, Clock, FileText, Home } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 rounded-xl mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">⚓ AnchorStack</h1>
      <nav className="flex space-x-4 text-sm text-gray-700">
        <a href="#dashboard" className="hover:underline flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Dashboard
        </a>
        <a href="#focus" className="hover:underline flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Focus
        </a>
        <a href="#notes" className="hover:underline flex items-center">
          <FileText className="w-4 h-4 mr-1" />
          Notes
        </a>
        <a href="#vault" className="hover:underline flex items-center">
          <Anchor className="w-4 h-4 mr-1" />
          Vault
        </a>
      </nav>
    </header>
  )
}

export { Header }

