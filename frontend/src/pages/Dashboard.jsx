import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatbotWidget from "../components/ChatbotWidget";
import EducationalArticles from "../components/EducationalArticles";
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
  AOS.init({ duration: 1000 });
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest") === "true";
  
  if (!token && !isGuest) navigate("/login");  // ✅ Only redirect if not logged in and not guest
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow fixed w-full z-50 rounded-b-2xl">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <h1 className="text-xl font-bold text-indigo-700">🧠 MindWare</h1>

    {/* Desktop Nav */}
    <ul className="hidden md:flex space-x-6 text-sm font-medium">
      <li><a href="#hero" className="hover:text-indigo-600">Home</a></li>
      <li><a href="#services" className="hover:text-indigo-600">Services</a></li>
      <li><a href="#coping" className="hover:text-indigo-600">Coping Tips</a></li>
      <li><button onClick={() => navigate("/resources")} className="hover:text-indigo-600">Resources</button></li>
      <li><a href="#news" className="hover:text-indigo-600">News</a></li>
      <li><button onClick={() => navigate("/community-qa")} className="hover:text-indigo-600">Community</button></li>
      <li>
        <button onClick={handleLogout} title="Logout" className="text-red-500 hover:text-red-700">
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </button>
      </li>
    </ul>

    {/* Hamburger Icon for Mobile */}
    <div className="md:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-700">
        {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {menuOpen && (
    <div className="md:hidden bg-white shadow rounded-b-xl px-4 pb-4 space-y-3 text-sm font-medium">
      <a href="#hero" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Home</a>
      <a href="#services" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Services</a>
      <a href="#coping" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">Coping Tips</a>
      <button onClick={() => { navigate("/resources"); setMenuOpen(false); }} className="block hover:text-indigo-600">Resources</button>
      <a href="#news" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">News</a>
      <button onClick={() => { navigate("/community-qa"); setMenuOpen(false); }} className="block hover:text-indigo-600">Community</button>
      <button
        onClick={() => { handleLogout(); setMenuOpen(false); }}
        className="flex items-center gap-1 text-red-500 hover:text-red-700"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
      </button>
    </div>
  )}
</nav>


      {/* Hero Section */}
      <section id="hero" className="pt-28 pb-24 bg-gradient-to-br from-indigo-100 via-white to-blue-100 rounded-b-3xl">
        <div className="max-w-6xl mx-auto text-center space-y-6 px-4">
          <h2 className="text-5xl font-bold text-indigo-700" data-aos="fade-up">
            Your Mental Wellness Journey Starts Here 💙
          </h2>
          <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
            Discover tools, resources, and support to help you take control of your mental health.
            Whether you're feeling anxious, down, or just curious about your well-being —
            we're here for you, always.
          </p>
          <div className="flex justify-center gap-4 mt-6" data-aos="fade-up" data-aos-delay="400">
            <button
              onClick={() => navigate("/quiz")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
            >
              📝 Take Your Self-Assessment
            </button>
            
            <button
              onClick={() => navigate("/mood")}
              className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-xl shadow hover:bg-indigo-50"
            >
              🧘 Mood Tracker
            </button>

            <button
        onClick={() => navigate("/history")}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-xl shadow"
      >
        📅 View History
      </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 space-y-10 rounded-2xl shadow-lg p-6 bg-indigo-50">
          <h3 className="text-3xl font-bold text-center text-indigo-700">🛠️ Our Mental Health Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Psychological Counseling",
                emoji: "🧑‍⚕️",
                desc: "Get professional support through confidential, one-on-one therapy sessions with trained psychologists and counselors.",
              },
              {
                title: "Self-Assessment Tools",
                emoji: "📊",
                desc: "Use scientifically backed quizzes and tests to monitor your mental well-being and identify areas that need attention.",
              },
              {
                title: "Community Support",
                emoji: "🤝",
                desc: "Engage with peers, support groups, and helplines to build connection, empathy, and shared healing.",
              },
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition-all border border-gray-200">
                <h4 className="text-xl font-semibold mb-2 text-indigo-800">{s.emoji} {s.title}</h4>
                <p className="text-gray-700 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coping Section */}
      <section id="coping" className="py-20 bg-indigo-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-6 text-center rounded-2xl shadow-lg bg-white p-6">
          <h3 className="text-3xl font-bold text-indigo-700 mb-6">🧘 Coping With Mental Health</h3>
          <ul className="text-gray-700 space-y-4 text-left text-md">
            <li>✅ Practice mindfulness, deep breathing, and grounding exercises daily.</li>
            <li>✅ Create a routine that includes adequate sleep, hydration, and balanced meals.</li>
            <li>✅ Talk openly with a trusted friend, family member, or licensed professional.</li>
            <li>✅ Reduce screen time and exposure to toxic content on social media.</li>
            <li>✅ Pursue creative hobbies, physical movement, or journaling for emotional release.</li>
          </ul>
        </div>
      </section>
      {/* Educational Articles */}
      <EducationalArticles />

      {/* Resources */}
      <section id="resources" className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-5xl mx-auto px-4 text-center rounded-2xl shadow-lg bg-indigo-50 p-6">
          <h3 className="text-3xl font-bold text-indigo-700 mb-4">📚 Trusted Resources</h3>
          <p className="text-gray-600 mb-4">
            Find verified platforms and helplines offering free resources, emotional aid, and expert knowledge:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li><a href="https://mentalhealthindia.org" target="_blank" className="text-blue-600 hover:underline">🌐 Mental Health India – Support & Programs</a></li>
            <li><a href="https://www.who.int/campaigns/world-mental-health-day" target="_blank" className="text-blue-600 hover:underline">🌐 WHO – Mental Health Initiatives</a></li>
            <li>📞 iCall Helpline: <a href="tel:9152987821" className="text-blue-600 hover:underline">9152987821</a></li>
          </ul>
        </div>
      </section>

      {/* 📰 News & Insights */}
<section id="news" className="py-20 bg-indigo-100" data-aos="fade-up">
  <div className="max-w-6xl mx-auto px-6 rounded-2xl shadow-lg bg-white p-8">
    <h3 className="text-3xl font-bold text-center text-indigo-800 mb-6">📰 News & Insights</h3>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* 1 */}
      <div className="bg-indigo-50 p-4 rounded-xl shadow hover:shadow-lg transition border border-indigo-100">
        <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80" alt="nasal spray therapy" className="rounded mb-3 w-full h-40 object-cover" />
        <h4 className="font-semibold text-lg text-indigo-700 mb-1">New Psychedelic Nasal Spray Shows Promise</h4>
        <p className="text-sm text-gray-600">
          A recent clinical trial reveals that a novel nasal spray reduces depressive symptoms for up to 8 weeks after a single treatment session. Researchers see great potential for acute interventions.
        </p>
      </div>

      {/* 2 */}
      <div className="bg-indigo-50 p-4 rounded-xl shadow hover:shadow-lg transition border border-indigo-100">
        <img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/14528/3f85b1b1-9dc7-4a90-855c-dc204646e889.jpg" alt="mental health community funding" className="rounded mb-3 w-full h-40 object-cover" />
        <h4 className="font-semibold text-lg text-indigo-700 mb-1">Community Services Face Funding Cuts</h4>
        <p className="text-sm text-gray-600">
          A long-standing community center supporting mental health patients may shut down following funding redistributions. Local advocates urge policy makers to reconsider priorities.
        </p>
      </div>

      {/* 3 */}
      <div className="bg-indigo-50 p-4 rounded-xl shadow hover:shadow-lg transition border border-indigo-100">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6wvHKQMEf6WAfzNhwlPCmSkE2CZtXjO_-DbKq62MjpA9F6JcxwHBQVEPG_whkl_uE8I&usqp=CAU" alt="therapy bro summer" className="rounded mb-3 w-full h-40 object-cover" />
        <h4 className="font-semibold text-lg text-indigo-700 mb-1">‘Therapy Bro’ Summer Goes Viral</h4>
        <p className="text-sm text-gray-600">
          More Gen Z men are embracing therapy and emotional vulnerability. 2025 is being dubbed the summer of emotional wellness for modern masculinity.
        </p>
      </div>
    </div>

    {/* Additional News Items */}
    <div className="mt-12 grid md:grid-cols-2 gap-6 text-gray-700">
      <div>
        <h4 className="font-semibold text-indigo-700">🔍 ADHD Research Gaps Highlighted</h4>
        <p className="text-sm">
          A global review found that many ADHD clinical trials lacked rigorous testing methods. Experts emphasize better diagnostics and longitudinal data.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-indigo-700">💬 BIPOC Mental Health Awareness</h4>
        <p className="text-sm">
          July marks Minority Mental Health Awareness Month. Organizations like Mental Health America have launched toolkits to help marginalized communities access care.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-10 mt-10 rounded-t-3xl" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-2">MindWare</h4>
            <p>MindWare is your safe space for mental clarity and emotional support. Start your healing journey now.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p>Email: support@MindWare.com</p>
            <p>Phone: +91-9876543210</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Stay Connected</h4>
            <p>Follow us for mental health tips & updates:</p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-blue-300">🐦 Twitter</a>
              <a href="#" className="hover:text-blue-300">📘 Facebook</a>
              <a href="#" className="hover:text-blue-300">📸 Instagram</a>
            </div>
          </div>
        </div>
        <p className="text-center mt-8 text-gray-300 text-xs">
          © {new Date().getFullYear()} MindWare | Designed with 💜 by Vishwajeet Kumar
        </p>
      </footer>
      <ChatbotWidget />
    </div>
  );
}
