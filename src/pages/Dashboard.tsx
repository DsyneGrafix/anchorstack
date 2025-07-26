import Layout from '../layouts/Layout'
import FocusTimer from "@/components/FocusTimer"
import QuickNotes from "@/components/QuickNotes"


export default function DashboardPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-10 text-anchor-800 text-center">
          🎯 AnchorStack Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Focus Timer */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-anchor-700 mb-4">⏱️ Focus Timer</h2>
            <FocusTimer />
          </div>

          {/* Quick Notes */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-anchor-700 mb-4">📝 Quick Notes</h2>
            <QuickNotes />
          </div>
        </div>
      </div>
    </Layout>
  )
}
