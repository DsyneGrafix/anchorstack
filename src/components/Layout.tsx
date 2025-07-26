import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-neutral-50 text-neutral-900">{children}</div>
)

export default Layout