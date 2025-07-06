import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tests } from "../data/testList";


export default function QuizSelector() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(null);

  const handleFlip = (id, e) => {
    e.stopPropagation(); // Prevent triggering navigate
    setFlipped((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800 font-sans px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700">🧠 Take a Mental Health Test</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Choose a screening test to begin your self-assessment journey. Your mental well-being matters.
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              onClick={() => navigate(`/quiz/${test.slug}`)}
              className="perspective cursor-pointer"
            >
              <div
                className={`relative w-full h-48 transition-transform duration-500 transform-style ${
                  flipped === test.id ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-180px bg-white rounded-2xl shadow-md p-6 backface-hidden border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-indigo-800">{test.name}</h2>
                    <span
                      onClick={(e) => handleFlip(test.id, e)}
                      className="text-2xl text-indigo-600 hover:text-indigo-800"
                    >
                      +
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{test.description}</p>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-indigo-50 rounded-2xl shadow-md p-6 backface-hidden rotate-y-180 border border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-indigo-700 font-semibold">📖 About This Test</h4>
                    <button
                      onClick={(e) => handleFlip(test.id, e)}
                      className="text-indigo-600 text-lg hover:text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    {test.details ||
                      "This self-assessment test gives you a quick insight into your emotional state. It helps raise awareness of possible symptoms and encourages professional consultation if necessary."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mt-12">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">📌 Why Take a Mental Health Test?</h3>
          <p className="text-gray-700 mb-3">
            Mental health issues are more common than most people realize. Early detection can lead to better outcomes,
            improved emotional stability, and a higher quality of life. These quizzes are not diagnostic tools, but
            can help you understand whether professional support might be beneficial.
          </p>
          <ul className="list-disc ml-6 text-gray-600 space-y-2 text-sm">
            <li>Helps identify symptoms like stress, anxiety, or depression early.</li>
            <li>Builds awareness and confidence to seek therapy or counseling.</li>
            <li>Improves emotional literacy and mental resilience.</li>
            <li>All results are confidential and for self-reflection only.</li>
          </ul>
        </section>

        {/* Education Section */}
        <section className="bg-indigo-50 rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">🎓 Learn About Mental Health</h3>
          <p className="text-gray-700 mb-3">
            Mental health affects how we think, feel, and behave. Issues like anxiety, depression, PTSD, and
            addiction are not signs of weakness, but health conditions that deserve attention and care—just like
            physical illnesses.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🧩 Mental Illness is Treatable</h4>
              <p>
                From therapy to medications and community support, many treatments exist. You're not alone, and
                seeking help is the first brave step.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
              <h4 className="font-semibold text-indigo-700 mb-2">🚨 Warning Signs</h4>
              <p>
                Persistent sadness, isolation, excessive worry, or drastic mood changes may signal deeper concerns.
                Take them seriously and don't hesitate to explore further.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
