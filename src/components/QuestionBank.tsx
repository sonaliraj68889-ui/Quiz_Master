import { useState } from 'react';
import { CATEGORIES, QUESTION_BANK } from '../data';
import { Category } from '../types';
import { Search, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function QuestionBank() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = QUESTION_BANK.filter(q => {
    const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Quiz Question Bank', 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Category: ${activeCategory}`, 14, 30);
    doc.text(`Total Questions: ${filteredQuestions.length}`, 14, 36);

    const tableColumn = ["#", "Category", "Question", "Answer"];
    const tableRows: any[] = [];

    filteredQuestions.forEach((q, index) => {
      const rowData = [
        index + 1,
        q.category,
        q.question,
        q.correctAnswer,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 40 }
      }
    });

    doc.save(`quiz_questions_${activeCategory.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Complete Question Bank</h2>
          <button
            onClick={handleExportPDF}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Export as PDF
          </button>
        </div>
        <p className="text-gray-600 mb-6 flex flex-col sm:flex-row gap-2 justify-between">
          <span>Browse all {QUESTION_BANK.length} available questions to prepare for your inter-school quiz competition.</span>
          <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-max">
            1000+ Question Capacity Engine
          </span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search questions or answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as Category | 'All')}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            <p className="text-gray-500 font-medium">No questions found matching your search.</p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-xs font-bold tracking-wider uppercase text-blue-600">
                    {q.category}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
                    {q.question}
                  </h4>
                  <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-2 bg-green-50 border border-green-100 w-max px-3 py-1.5 rounded-md">
                    <span className="font-bold text-green-800">Answer:</span> {q.correctAnswer}
                  </div>
                  {q.explanation && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-semibold text-gray-700">Explanation:</span> {q.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
