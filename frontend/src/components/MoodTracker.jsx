import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😫", label: "Stressed" },
  { emoji: "😠", label: "Angry" },
];

const moodScoreMap = {
  "😊": 5,
  "😐": 4,
  "😔": 3,
  "😫": 2,
  "😠": 1,
};

const isGuest = localStorage.getItem("guest") === "true";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    if (isGuest) {
      const guestData = JSON.parse(localStorage.getItem("guestMoods") || "[]");
      setHistory(guestData.reverse());
    } else {
      try {
        const res = await API.get("/mood/history", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setHistory(res.data.reverse());
      } catch (err) {
        console.error("Error fetching mood history:", err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    const newEntry = {
      mood: selectedMood,
      note,
      createdAt: new Date().toISOString(),
      _id: Date.now(),
    };

    if (isGuest) {
      const guestData = JSON.parse(localStorage.getItem("guestMoods") || "[]");
      guestData.push(newEntry);
      localStorage.setItem("guestMoods", JSON.stringify(guestData));
      setNote("");
      setSelectedMood("");
      fetchMoodHistory();
    } else {
      try {
        await API.post(
          "/mood/add",
          { mood: selectedMood, note },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setNote("");
        setSelectedMood("");
        fetchMoodHistory();
      } catch (err) {
        console.error("Error saving mood:", err);
      }
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditNote(entry.note);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNote("");
  };

  const submitEdit = async () => {
    if (isGuest) {
      const updated = history.map((entry) =>
        entry._id === editingId ? { ...entry, note: editNote } : entry
      );
      localStorage.setItem("guestMoods", JSON.stringify(updated.reverse()));
      cancelEdit();
      fetchMoodHistory();
    } else {
      try {
        await API.put(
          `/mood/edit/${editingId}`,
          { note: editNote },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        cancelEdit();
        fetchMoodHistory();
      } catch (err) {
        console.error("Edit failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      if (isGuest) {
        const updated = history.filter((entry) => entry._id !== id);
        localStorage.setItem("guestMoods", JSON.stringify(updated.reverse()));
        fetchMoodHistory();
      } else {
        try {
          await API.delete(`/mood/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          fetchMoodHistory();
        } catch (err) {
          console.error("Delete failed:", err);
        }
      }
    }
  };

  const chartDataPoints = history.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    mood: moodScoreMap[entry.mood] ?? 3,
  }));

  const chartData = {
    labels: chartDataPoints.map((p) => p.date),
    datasets: [
      {
        label: "Mood Trend",
        data: chartDataPoints.map((p) => p.mood),
        fill: false,
        borderColor: "#6366F1",
        backgroundColor: "#6366F1",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) =>
            Object.entries(moodScoreMap).find(([, val]) => val === value)?.[0] || value,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8">
        <h1 className="text-2xl font-bold text-indigo-700 text-center">🧘 Mood Tracker</h1>

        {/* Mood Picker */}
        <div className="flex flex-wrap justify-center gap-4">
          {moodOptions.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.emoji)}
              className={`text-3xl p-3 rounded-full border-2 transition ${
                selectedMood === m.emoji
                  ? "bg-indigo-100 border-indigo-500 scale-110"
                  : "hover:bg-gray-100 border-transparent"
              }`}
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        <textarea
          rows="3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a short note about how you're feeling..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          💾 Save Mood
        </button>

        {/* Mood History */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📅 Mood History</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No mood entries yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((entry) => (
                <li
                  key={entry._id}
                  className="bg-indigo-50 p-4 rounded-xl shadow-sm text-sm text-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                    <span className="text-xl">{entry.mood}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {editingId === entry._id ? (
                    <>
                      <textarea
                        className="w-full border rounded p-2 mt-2 text-sm"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={submitEdit}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {entry.note && <p className="italic mt-1">📝 {entry.note}</p>}
                      {!isGuest && (
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="text-indigo-600 text-xs hover:underline"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="text-red-600 text-xs hover:underline"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mood Trend Chart */}
        {history.length >= 2 && (
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">📈 Mood Trend</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
