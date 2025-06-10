import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
            TravelStoreHN
          </h1>
        </main>
      </div>
    </Router>
  )
}

export default App 