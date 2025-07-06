import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      
      {/* 🔷 MindWare Logo */}
      <div data-aos="fade-down" className="mb-6 flex flex-col items-center space-y-1">
        <div className="text-5xl">🧠</div>
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">MindWare</h1>
      </div>

      <div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn"
        data-aos="fade-up"
      >
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">📝 Create Your Account</h2>
          <p className="text-sm text-gray-600">Join MindWare and take your first step toward well-being 💫</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute top-3 left-3 text-indigo-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute top-3 left-3 text-indigo-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute top-3 left-3 text-indigo-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            🎉 Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
