import React from 'react';
import articles from '../data/articles';

export default function EducationalArticles() {
  return (
    <section id="articles" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">📚 Mental Health Articles</h2>
        <p className="text-gray-600 mb-10">
          Learn more about your mental health with our expert-curated articles.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-indigo-50 p-5 rounded-lg shadow-md text-left hover:shadow-lg transition"
            >
              <p className="text-xs font-semibold text-indigo-500 mb-1">{article.category}</p>
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{article.summary}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-indigo-600 hover:underline"
            >
            Read Full Article →
            </a>

              <div className="text-xs text-gray-500">{article.readTime} read</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
