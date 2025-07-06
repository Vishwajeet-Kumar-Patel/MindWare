import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import QuizSelector from './pages/QuizSelector';
import QuizPage from './pages/QuizPage';
import HistoryPage from './pages/HistoryPage';
import QuizResultDashboard from './pages/QuizResultDashboard';
import MoodPage from './pages/MoodPage';
import PrivateRoute from './utils/PrivateRoute';
import CommunityQA from './pages/CommunityQA';
import ResourceDirectory from './pages/ResourceDirectory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><QuizSelector /></PrivateRoute>} />
        <Route path="/quiz/:type" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
        <Route path="/result-dashboard" element={<PrivateRoute><QuizResultDashboard /></PrivateRoute>} />
        <Route path="/mood" element={<PrivateRoute><MoodPage /></PrivateRoute>} />
        <Route path="/community-qa" element={<PrivateRoute><CommunityQA /></PrivateRoute>} />
        <Route path="/resources" element={<ResourceDirectory />} />
      </Routes>
    </div>
  );
}

export default App;
