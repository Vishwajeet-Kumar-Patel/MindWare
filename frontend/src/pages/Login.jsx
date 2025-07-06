import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { auth, provider } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/solid';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // 💼 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      localStorage.removeItem('guest'); // Clear guest mode
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // 🔐 Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider || new GoogleAuthProvider());
      const user = result.user;
      const token = await user.getIdToken(); // ✅ Firebase ID token

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('guest'); // Clear guest mode
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError('Google Sign-In failed. Try again.');
    }
  };

  // 👤 Guest Mode
  const handleGuestLogin = () => {
  localStorage.setItem("guest", "true");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  const guest = localStorage.getItem("guest");
  console.log("👤 Guest login → guest:", guest); // Make sure it prints "true"

  navigate("/dashboard");
};


  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4`}>

      {/* 🧠 Logo */}
      <div data-aos="fade-down" className="mb-6 flex flex-col items-center space-y-1">
        <div className="text-5xl">🧠</div>
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">MindWare</h1>
      </div>

      {/* 🔐 Login Box */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn" data-aos="fade-up">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-bold text-indigo-800">🔐 Login to Continue</h2>
          <p className="text-sm text-gray-600">Welcome back! Let’s continue your wellness journey 🧘‍♂️</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">⚠️ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 📧 Email Input */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute top-3 left-3 text-indigo-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-gray-800"
            />
          </div>

          {/* 🔑 Password Input */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute top-3 left-3 text-indigo-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition text-gray-800"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer text-indigo-500"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </span>
          </div>

          {/* ☑️ Remember Me */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-indigo-500"
              />
              Remember Me
            </label>
            <Link to="#" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* 🚀 Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            🚀 Login
          </button>
        </form>

        {/* 📝 Sign up Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>

        {/* OR Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* 🔐 Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-800 border border-gray-300 shadow px-6 py-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeSc-26pBPN6KmKjMG0g2cDbZHWv4OS5Ocxg&s"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* 👤 Guest Login */}
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-200 text-gray-800 px-6 py-2 mt-3 rounded hover:bg-gray-300 transition"
        >
          👤 Continue as Guest
        </button>
      </div>
    </div>
  );
}
