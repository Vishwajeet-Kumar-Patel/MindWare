import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizQuestions } from "../data/quizQuestions";
import API from "../api/axios";

export default function QuizPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const questions = quizQuestions[type];

  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const isGuest = localStorage.getItem("guest") === "true";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !isGuest) {
      navigate("/login");
    } else if (!questions) {
      setError("Invalid quiz type.");
    } else {
      const initialAnswers = Array(questions.length).fill(null);
      setAnswers(initialAnswers);
    }
  }, [questions, navigate, token, isGuest]);

  useEffect(() => {
    const answeredCount = answers.filter((a) => a !== null).length;
    const progressPercent = Math.floor((answeredCount / questions.length) * 100);
    setProgress(progressPercent);
  }, [answers]);

  const handleOptionChange = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const unanswered = answers.some((ans) => ans === null);
    if (unanswered) {
      setError("Please answer all the questions before submitting.");
      return;
    }

    let total = 0;
    answers.forEach((ansIndex, i) => {
      total += questions[i].scores[ansIndex] || 0;
    });

    if (!isGuest && token) {
      try {
        await API.post(
          "/quiz/save",
          { quizType: type, score: total },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Error saving result:", err);
      }
    }

    navigate("/result-dashboard", {
      state: {
        testName: type,
        questions,
        answers,
        score: total,
      },
    });
  };

  if (error && !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700 capitalize">🧠 {type} Test</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Answer honestly to receive personalized mental wellness insights.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600">{progress}% completed</p>

        {/* Quiz Questions */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
            >
              <p className="font-medium text-indigo-800 mb-2">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={answers[qIndex] === optIndex}
                      onChange={() => handleOptionChange(qIndex, optIndex)}
                      className="accent-indigo-500"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="text-center text-red-600 text-sm mt-4">{error}</div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full mt-6 py-2 rounded-lg font-semibold shadow transition ${
            answers.includes(null)
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
          disabled={answers.includes(null)}
        >
          ✅ Submit Answers
        </button>
      </div>
    </div>
  );
}
