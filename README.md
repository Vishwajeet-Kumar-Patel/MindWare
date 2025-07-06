# 🧠 Mental Health Self-Assessment Portal

A modern, interactive, and comprehensive mental wellness platform that allows users to assess their mental health through scientifically backed quizzes, track their mood, maintain journals, interact with an AI chatbot, and access curated resources — all in a beautifully designed responsive interface.

---

## 🌟 Live Preview

🚀 [Visit the Live Site](https://mind-ware.vercel.app/)  
🔐 Demo Login:  
- Can directly Login as Guest by clicking on the option

---

## ✨ Features Overview

### ✅ Core Functionality

- **🔐 Authentication**
  - Email + password-based login
  - Guest login support

- **🧪 Self-Assessment Tests**
  - 6 mental health quizzes: **Depression, Anxiety, Stress, PTSD, OCD, Addiction**
  - Dynamic scoring logic per quiz type

- **📊 Quiz Result Dashboard**
  - Radar, Bar & Pie Charts (powered by Chart.js)
  - Personalized feedback based on score
  - Options to **Retry** or **Share with Counselor**

- **📅 History Page**
  - View all past quiz attempts
  - Detailed result viewer
  - 📈 Line Chart to visualize score trends
  - 🧾 **Downloadable PDF Report**

---

### 💡 Enhancements & Mental Wellness Tools

- **📆 Mood Tracker**
  - Daily check-in using emojis
  - Visualized tracking of emotional patterns

- **📓 Journal Section**
  - Private journaling feature for self-reflection
  - Secure per-user saved entries

- **💬 AI Chatbot (MindBot)**
  - Powered by OpenRouter / GPT APIs
  - Friendly conversation and suggestions
  - Custom widget with emoji UI & typing animation

---

### 📚 Community & Content

- **📚 Educational Articles**
  - Curated cards for Depression, Anxiety, OCD, ADHD, etc.
  - Tags, read time, and external reading links

- **🤝 Community Q&A**
  - Anonymous mental health questions
  - AI-based answers categorized by topic (Depression, Anxiety, etc.)

- **🧭 Resource Directory**
  - Over 15 trusted organizations (Helplines, NGOs, Therapy Platforms)
  - Filters: Cost, Type, Location
  - External verified links

---

### 🎨 UI/UX & Design

- 🌈 **Clean Light Theme** with consistency across pages
- ✨ **Smooth Animations** using AOS
- 📱 **Fully Responsive** for mobile and tablets
- 🌌 **Optional Animated Backgrounds** (e.g., bubbles)
- 🚪 **Logout Icon Button** for aesthetic navbar design

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, AOS, Chart.js
- **Backend**: Node.js, Express.js, MongoDB (Optional API layer)
- **Auth**: JWT (Token-based login)
- **PDF Export**: jsPDF / html2canvas
- **AI Chatbot**: OpenRouter / GPT-4 API
- **Charting**: Chart.js

---

## 📁 Folder Structure (Simplified)

/src
┣ /components # Reusable components (Navbar, QuizCard, MoodTracker, etc.)
┣ /pages # Route pages (LoginPage, DashboardPage, QuizPage, etc.)
┣ /data # Static data (questions.js, articles.js, resources.js)
┣ /assets # Images, logos, background animations
┣ App.js # Main app with route definitions
┗ index.js # ReactDOM render entry point

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/Vishwajeet-Kumar-Patel/MindWare.git
cd frontend
npm install
npm run dev

cd server
node server.js


💡 Future Scope (Optional Enhancements)
Here are some features planned for future releases:

🔐 OAuth Login — Enable sign-in via Google, GitHub, etc.

🕵️ Anonymous Journaling Mode — Journal entries without login.

📧 Email Reminders — Set daily or weekly check-in reminders.

🛠️ Admin Dashboard — Manage quizzes, user data, and analytics.

💬 Community Chat Forum — Real-time peer support & group discussions.

🌐 Hindi / Multilingual Support — Expand accessibility with regional language support.

🙌 Acknowledgements
Special thanks to the tools, APIs, and resources that made this project possible:

🧠 Mental Health America – For quiz templates & screening structure

🤖 OpenRouter – GPT-based AI chatbot backend

📈 Chart.js – Data visualization library

🌀 AOS (Animate on Scroll) – Smooth section animations

📬 Feedback & Contribution
Got ideas to make this better?
We welcome feedback, contributions, or feature suggestions!

➡️ Open a GitHub Issue
➡️ Submit a Pull Request
➡️ Drop a star ⭐ if you found it useful!

📄 License
This project is licensed under the MIT License.

Feel free to use, modify, and distribute with proper attribution.

💜 Built With Love by Vishwajeet Kumar
Empowering mental health through tech. Let's build for good. 🙌