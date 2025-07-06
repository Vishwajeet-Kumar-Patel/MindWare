import React from "react";
import { Pie, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function QuizResultChart({ questions, answers }) {
  const labels = questions.map((_, i) => `Q${i + 1}`);
  const scores = answers.map(
    (ansIndex, i) => (ansIndex !== null ? questions[i].scores[ansIndex] : 0)
  );

  const categories = ["Mood", "Energy", "Focus", "Sleep", "Anxiety"];
  const radarScores = [0, 0, 0, 0, 0];
  const categoryCount = [0, 0, 0, 0, 0];

  answers.forEach((ansIndex, i) => {
    if (ansIndex !== null) {
      const score = questions[i].scores[ansIndex];
      const catIndex = i % 5;
      radarScores[catIndex] += score;
      categoryCount[catIndex] += 1;
    }
  });

  const radarData = {
    labels: categories,
    datasets: [
      {
        label: "Wellness Score",
        data: radarScores.map((sum, i) =>
          categoryCount[i] ? (sum / categoryCount[i]).toFixed(1) : 0
        ),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366f1",
        pointBackgroundColor: "#6366f1",
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Score per Question",
        data: scores,
        backgroundColor: [
          "#4ade80", "#facc15", "#f87171", "#60a5fa", "#a78bfa", "#f472b6",
          "#34d399", "#fb923c", "#c084fc", "#818cf8", "#fcd34d", "#f43f5e",
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Score",
        data: scores,
        backgroundColor: "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#475569", font: { size: 12 } },
        grid: { color: "#e5e7eb" },
      },
      x: {
        ticks: { color: "#475569", font: { size: 12 } },
        grid: { color: "#f1f5f9" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#f8fafc",
      },
    },
  };

  return (
  <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl p-6 shadow-inner">
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {/* Chart Card Template */}
      {[
        {
          title: "🎯 Score Distribution (Pie Chart)",
          component: <Pie data={pieData} />,
        },
        {
          title: "📊 Score by Question (Bar Chart)",
          component: <Bar data={barData} options={chartOptions} />,
        },
        {
          title: "🧭 Wellness Overview (Radar Chart)",
          component: <Radar data={radarData} />,
        },
      ].map((chart, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
        >
          <h2 className="text-center text-lg font-semibold text-indigo-700 mb-4">
            {chart.title}
          </h2>
          <div className="aspect-[1/1] max-h-96 flex items-center justify-center">
            {chart.component}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}