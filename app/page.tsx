import MainLayout from './components/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-medium">KIMU</h1>
          <p className="text-primary/60 mt-4">Your AI-powered assistant</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-medium mb-4">Quick Search</h2>
            <input
              type="text"
              placeholder="Search your documents..."
              className="input"
            />
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-primary/60">No recent activity</p>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="btn w-full">New Chat</button>
              <button className="btn w-full">Upload Document</button>
              <button className="btn w-full">View Settings</button>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-medium mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-primary/60">Documents</p>
                <p className="text-2xl font-medium">0</p>
              </div>
              <div>
                <p className="text-sm text-primary/60">Chats</p>
                <p className="text-2xl font-medium">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 