import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import QuizResultChart from "../components/QuizResultChart";

export default function QuizResultDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers, testName, score } = location.state || {};

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (!questions || !answers || score === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-red-600">⚠️ No Results Found</h1>
          <p className="text-gray-700">It looks like you haven't completed any test yet.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            ⬅️ Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const formattedTestName =
    testName?.charAt(0).toUpperCase() + testName?.slice(1).toLowerCase();

  let adviceText = "";
  if (score <= 9)
    adviceText = "✅ Minimal symptoms — No immediate concern. Maintain healthy habits.";
  else if (score <= 20)
    adviceText = "🟡 Mild — Consider self-care and keep checking in with yourself.";
  else if (score <= 30)
    adviceText = "🟠 Moderate — Talking to a professional is advised.";
  else
    adviceText = "🔴 Severe — Please consult a licensed mental health expert immediately.";

  const mailToLink = `mailto:counselor@mindcare.com?subject=Quiz%20Assessment%20Sharing&body=Hello%20Counselor,%0D%0A%0D%0AI%20just%20completed%20the%20${formattedTestName}%20test%20on%20MindWare.%0D%0AMy%20score:%20${score}.%0D%0A%0D%0A${adviceText}%0D%0A%0D%0AThank%20you!`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-10 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 🔖 Test Header */}
        <div className="text-center space-y-2" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-indigo-800">
            🧠 {formattedTestName} Test Results
          </h1>
          <p className="text-gray-600 text-sm">
            Here’s how you did based on your responses.
          </p>
        </div>

        {/* 📊 Result Charts */}
        <div data-aos="fade-up" data-aos-delay="200">
          <QuizResultChart questions={questions} answers={answers} />
        </div>

        {/* 🎯 Personalized Feedback */}
        <div
          className="bg-white p-6 rounded-2xl shadow border border-gray-100 mt-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-xl font-bold text-indigo-700 mb-2">🎯 Personalized Feedback</h2>

          <div className="text-sm text-gray-800 space-y-2">
            <p>
              <strong>Total Score:</strong> {score}
            </p>
            <p className="text-gray-700">{adviceText}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href={mailToLink}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm"
            >
              📤 Share with Counselor
            </a>
            <button
              onClick={() => navigate("/quiz")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm"
            >
              🔁 Take Another Test
            </button>
            <button
              onClick={() => navigate("/history")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition text-sm"
            >
              📜 View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
