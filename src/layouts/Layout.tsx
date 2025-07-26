import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-neutral-100 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-anchor-700 text-white py-4 px-6 shadow-md">
          <h1 className="text-xl font-bold">AnchorStack</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="bg-neutral-200 text-sm text-center py-3 text-neutral-600">
          © {new Date().getFullYear()} AnchorStack. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
