import React, { useState } from 'react';
import questions from '../data/questions';

export default function CommunityQA() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? questions : questions.filter(q => q.tag === filter);
  const tags = ['All', 'Anxiety', 'Depression', 'Addiction', 'ADHD', 'PTSD', 'OCD'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-indigo-700 text-center">🤝 Community Q&A</h2>
        <p className="text-gray-600 text-sm text-center">
          Browse anonymous questions and responses from MindBot. Click a category to filter.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1 text-sm rounded-full border transition duration-200 ${
                filter === t
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="grid gap-5">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="text-indigo-900 font-medium">❓ {q.question}</p>
              <p className="text-sm text-gray-700 mt-2">🧠 {q.answer}</p>
              <span className="mt-3 inline-block text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                #{q.tag}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 text-sm italic mt-8">
              No questions found under <strong>{filter}</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
