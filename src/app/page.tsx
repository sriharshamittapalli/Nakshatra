export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nakshatra
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8">
            Your gateway to space data APIs
          </p>
          <p className="text-lg text-slate-300 mb-12 leading-relaxed">
            Explore the cosmos through NASA&apos;s extensive collection of APIs. From astronomy pictures 
            to Mars rover data, from asteroid tracking to Earth observations - discover the universe 
            through data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🌌</div>
              <h3 className="text-xl font-semibold text-white mb-2">Space Imagery</h3>
              <p className="text-slate-300">Access stunning space photography and astronomical data</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Mission Data</h3>
              <p className="text-slate-300">Real-time data from NASA missions and spacecraft</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Earth & Climate</h3>
              <p className="text-slate-300">Monitor Earth&apos;s systems and environmental changes</p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-slate-400">
              Use the navigation above to explore different NASA APIs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}