import { useState } from 'react'
import SmartWordLookup from './components/SmartWordLookup.jsx'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('study')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [studyProgress] = useState({ studied: 147, mastered: 89, remaining: 234 })

  const StatCard = ({ title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
          <div className={`w-6 h-6 bg-${color}-500 rounded-lg`}></div>
        </div>
      </div>
    </div>
  )

  const NavigationItem = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="text-lg mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Top Navigation Bar - Gemini Style */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-full h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-full h-0.5 bg-gray-600 rounded"></div>
                </div>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SM</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  StudyMate AI
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">AI Online</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">👤</span>
                </div>
                <span className="font-medium text-gray-700">Dr. Student</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Azure Portal Style */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white/90 backdrop-blur-md border-r border-gray-200/50 min-h-screen`}>
          <nav className="p-4 space-y-2">
            <NavigationItem 
              icon="📚" 
              label="Study Session" 
              active={activeTab === 'study'} 
              onClick={() => setActiveTab('study')} 
            />
            <NavigationItem 
              icon="📊" 
              label="Analytics" 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')} 
            />
            <NavigationItem 
              icon="🎯" 
              label="Quiz Mode" 
              active={activeTab === 'quiz'} 
              onClick={() => setActiveTab('quiz')} 
            />
            <NavigationItem 
              icon="🧠" 
              label="AI Tutor" 
              active={activeTab === 'ai'} 
              onClick={() => setActiveTab('ai')} 
            />
            <NavigationItem 
              icon="⚡" 
              label="Quick Review" 
              active={activeTab === 'review'} 
              onClick={() => setActiveTab('review')} 
            />
            <NavigationItem 
              icon="⚙️" 
              label="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Dashboard Stats - Azure Portal Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Terms Studied Today" 
              value={studyProgress.studied} 
              subtitle="+23 from yesterday"
              color="blue"
            />
            <StatCard 
              title="Mastery Level" 
              value={`${Math.round((studyProgress.mastered / (studyProgress.studied + studyProgress.remaining)) * 100)}%`}
              subtitle={`${studyProgress.mastered} terms mastered`}
              color="green"
            />
            <StatCard 
              title="Streak" 
              value="12 days" 
              subtitle="Keep it up!"
              color="purple"
            />
          </div>

          {/* Study Interface - Anki + Gemini Style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Study Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Interactive Medical Case Study</h2>
                  <p className="text-blue-100 text-sm">Select any term for AI-powered explanations</p>
                </div>
                
                <div className="p-6">
                  <SmartWordLookup className="prose max-w-none">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <h3 className="font-semibold text-red-800 mb-2">🚨 Emergency Case</h3>
                        <p className="text-gray-700 leading-relaxed">
                          A 58-year-old male presents to the ED with crushing chest pain. The patient reports acute onset 
                          <strong className="text-red-600 hover:bg-red-100 px-1 rounded cursor-pointer transition-colors"> myocardial infarction</strong> symptoms 
                          following severe <strong className="text-red-600 hover:bg-red-100 px-1 rounded cursor-pointer transition-colors">angina</strong>. 
                          Initial <strong className="text-red-600 hover:bg-red-100 px-1 rounded cursor-pointer transition-colors">ECG</strong> shows 
                          ST-elevation in leads II, III, and aVF.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">🔬 Laboratory Results</h3>
                        <p className="text-gray-700 leading-relaxed">
                          <strong className="text-blue-600 hover:bg-blue-100 px-1 rounded cursor-pointer transition-colors">Troponin</strong> levels 
                          elevated at 15.2 ng/mL (normal &lt;0.04). <strong className="text-blue-600 hover:bg-blue-100 px-1 rounded cursor-pointer transition-colors">CK-MB</strong> 
                          at 45 ng/mL. <strong className="text-blue-600 hover:bg-blue-100 px-1 rounded cursor-pointer transition-colors">BNP</strong> 
                          significantly elevated indicating heart failure.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                        <h3 className="font-semibold text-green-800 mb-2">💊 Treatment Protocol</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Emergency <strong className="text-green-600 hover:bg-green-100 px-1 rounded cursor-pointer transition-colors">percutaneous coronary intervention</strong> (PCI) 
                          with <strong className="text-green-600 hover:bg-green-100 px-1 rounded cursor-pointer transition-colors">stent</strong> placement. 
                          Started on dual <strong className="text-green-600 hover:bg-green-100 px-1 rounded cursor-pointer transition-colors">antiplatelet therapy</strong>: 
                          <strong className="text-green-600 hover:bg-green-100 px-1 rounded cursor-pointer transition-colors">aspirin</strong> and 
                          <strong className="text-green-600 hover:bg-green-100 px-1 rounded cursor-pointer transition-colors">clopidogrel</strong>.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">📈 Follow-up</h3>
                        <p className="text-gray-700 leading-relaxed">
                          Post-procedural <strong className="text-purple-600 hover:bg-purple-100 px-1 rounded cursor-pointer transition-colors">echocardiogram</strong> 
                          revealed reduced EF of 35%. Discharged on <strong className="text-purple-600 hover:bg-purple-100 px-1 rounded cursor-pointer transition-colors">ACE inhibitors</strong>, 
                          <strong className="text-purple-600 hover:bg-purple-100 px-1 rounded cursor-pointer transition-colors">beta-blockers</strong>, and 
                          <strong className="text-purple-600 hover:bg-purple-100 px-1 rounded cursor-pointer transition-colors">statins</strong>.
                        </p>
                      </div>
                    </div>
                  </SmartWordLookup>
                </div>
              </div>
            </div>

            {/* AI Chat Interface - Gemini Style */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">AI Study Assistant</h3>
                </div>
                
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">I'm ready to help explain any medical concepts! Try selecting a term from the case study.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">💡 Tip: I can explain terms at Student, Resident, or Attending level!</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask me anything..." 
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    ✨
                  </button>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Study Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Cardiology</span>
                      <span className="text-green-600 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Pharmacology</span>
                      <span className="text-blue-600 font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Pathology</span>
                      <span className="text-purple-600 font-medium">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '52%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
