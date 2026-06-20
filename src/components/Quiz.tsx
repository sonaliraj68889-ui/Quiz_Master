import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Category } from '../types';
import { CATEGORIES, QUESTION_BANK } from '../data';
import { ArrowRight, RefreshCw, Trophy, Eye, CheckCircle2, XCircle } from 'lucide-react';

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isStarted, setIsStarted] = useState(false);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const startQuiz = () => {
    let pool = QUESTION_BANK;
    if (selectedCategory !== 'All') {
      pool = QUESTION_BANK.filter(q => q.category === selectedCategory);
    }
    
    // Shuffle questions and select up to 20 for a session
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
    
    setCurrentIndex(0);
    setScore(0);
    setIsAnswerShown(false);
    setIsStarted(true);
  };

  const handleSelfAssess = (knewIt: boolean) => {
    if (knewIt) {
      setScore(s => s + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    setIsAnswerShown(false);
    setCurrentIndex(i => i + 1);
  };

  const restartQuiz = () => {
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Flashcard Practice Mode</h2>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Master the massive 1000+ question bank! Read the question, think of the answer, and check if you got it right.
        </p>
        
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Category</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mixed (All Subjects)
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-100 flex justify-center items-center gap-2"
          >
            Start Practice Session <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto py-12 px-4 text-center"
      >
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Session Completed!</h2>
          <p className="text-gray-500 mb-6">Great job working through your flashcards.</p>
          
          <div className="text-5xl font-black text-blue-600 mb-2">{score} / {questions.length}</div>
          <p className="text-lg text-gray-700 font-medium mb-8">Accuracy: {percentage}%</p>
          
          <button
            onClick={restartQuiz}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-sm transition-all flex justify-center items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Start New Session
          </button>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
          {question.category}
        </span>
        <span className="text-sm font-semibold text-gray-500">
          Flashcard {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h3>

        <AnimatePresence mode="wait">
          {!isAnswerShown ? (
            <motion.button
              key="show-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsAnswerShown(true)}
              className="mt-8 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-semibold shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Eye className="w-6 h-6" /> Show Answer
            </motion.button>
          ) : (
            <motion.div
              key="answer-box"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="w-full"
            >
              <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 mb-8 text-left">
                <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block">Correct Answer</span>
                <p className="text-2xl font-bold text-blue-900 mb-2">{question.correctAnswer}</p>
                {question.explanation && (
                  <p className="text-blue-800 mt-4 text-sm font-medium bg-blue-100/50 p-3 rounded-lg">
                    <span className="font-bold">Fact:</span> {question.explanation}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelfAssess(false)}
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-100 bg-red-50 hover:bg-red-100 hover:border-red-200 text-red-700 font-semibold transition-all"
                >
                  <XCircle className="w-8 h-8" />
                  Didn't Know
                </button>
                <button
                  onClick={() => handleSelfAssess(true)}
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 border-green-100 bg-green-50 hover:bg-green-100 hover:border-green-200 text-green-700 font-semibold transition-all"
                >
                  <CheckCircle2 className="w-8 h-8" />
                  Knew It
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
