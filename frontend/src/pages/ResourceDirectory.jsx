import React, { useState } from 'react';
import resources from '../data/resources';

export default function ResourceDirectory() {
  const [type, setType] = useState('All');
  const [cost, setCost] = useState('All');
  const [location, setLocation] = useState('All');

  const filteredResources = resources.filter((r) => {
    return (
      (type === 'All' || r.type === type) &&
      (cost === 'All' || r.cost === cost) &&
      (location === 'All' || r.location === location)
    );
  });

  const unique = (key) => ['All', ...new Set(resources.map((r) => r[key]))];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4 text-center">📚 Resource Directory</h2>
        <p className="text-gray-600 mb-8 text-center text-sm">
          Trusted mental health platforms, helplines, NGOs, and support services.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select onChange={(e) => setType(e.target.value)} className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-sm text-black">
            {unique('type').map((t) => <option key={t}>{t}</option>)}
          </select>

          <select onChange={(e) => setCost(e.target.value)} className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-sm text-black">
            {unique('cost').map((c) => <option key={c}>{c}</option>)}
          </select>

          <select onChange={(e) => setLocation(e.target.value)} className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-sm text-black">
            {unique('location').map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map((r) => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow hover:shadow-md transition-all">
              <h4 className="text-lg font-semibold text-indigo-700 mb-1">{r.name}</h4>
              <p className="text-sm text-gray-700 mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">{r.type}</span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">{r.cost}</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{r.location}</span>
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue-600 hover:underline"
              >
                🔗 Visit Website
              </a>
            </div>
          ))}

          {filteredResources.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No matching resources found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
