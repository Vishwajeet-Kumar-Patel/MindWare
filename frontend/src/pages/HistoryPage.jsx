import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("https://mindware-1.onrender.com/api/results/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data.reverse()); // latest first
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const chartData = {
    labels: history.map((item) => new Date(item.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Score Over Time",
        data: history.map((item) => item.score),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 40,
        ticks: {
          color: "#334155",
          stepSize: 1,
        },
        grid: { color: "#e2e8f0" },
      },
      x: {
        ticks: { color: "#334155" },
        grid: { display: false },
      },
    },
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("quiz-history-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-20 text-gray-800">
      <div
        ref={reportRef}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-8"
      >
        {/* 🔖 Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">🕓 Your Assessment History</h2>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow transition text-sm"
          >
            📥 Download PDF
          </button>
        </div>

        {/* 📊 Chart */}
        {loading ? (
          <p className="text-center text-gray-600">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500">No quiz attempts found yet.</p>
        ) : (
          <>
            <div className="mb-10">
              <Line data={chartData} options={chartOptions} height={120} />
            </div>

            {/* 🗂️ History List */}
            <ul className="divide-y divide-gray-200">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="py-4 px-2 hover:bg-indigo-50 rounded-xl transition"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-indigo-800 uppercase">
                        {item.quizType}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Taken on{" "}
                        {new Date(item.createdAt).toLocaleDateString()} at{" "}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 mt-2 sm:mt-0 rounded-full font-semibold text-sm">
                      Score: {item.score}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
