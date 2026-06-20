import { useState } from 'react';
import Quiz from './components/Quiz';
import QuestionBank from './components/QuestionBank';
import { BookOpen, GraduationCap } from 'lucide-react';

type Tab = 'quiz' | 'bank';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('quiz');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              QuizMaster India
            </h1>
          </div>
          <nav className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="hidden sm:inline">Practice Mode</span>
              <span className="sm:hidden">Quiz</span>
            </button>
            <button 
              onClick={() => setActiveTab('bank')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'bank' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Question Bank</span>
              <span className="sm:hidden">Bank</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-12">
        {activeTab === 'quiz' ? <Quiz /> : <QuestionBank />}
      </main>
    </div>
  );
}
