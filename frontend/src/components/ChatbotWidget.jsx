import React, { useState } from 'react';
import { PaperAirplaneIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm <strong>MindBot</strong>, your mental health companion. How can I support you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input,
      });

      const botReply = { role: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = {
        role: 'bot',
        text: "⚠️ Oops! I'm having trouble responding right now. Please try again shortly.",
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
        >
          <ChatBubbleBottomCenterIcon className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl shadow">
            <h4 className="text-sm font-semibold tracking-wide">🧠 MindBot</h4>
            <button onClick={toggleChat} className="hover:text-gray-300 text-lg">×</button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm scrollbar-thin scrollbar-thumb-indigo-300">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 px-3 rounded-lg max-w-[85%] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-indigo-100 self-end ml-auto text-right text-gray-800'
                    : 'bg-gray-100 self-start mr-auto text-left text-gray-700'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}

            {loading && (
              <div className="bg-gray-100 text-left text-gray-600 text-sm p-2 rounded-md italic animate-pulse">
                ✍️ MindBot is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="text-indigo-600 hover:text-indigo-800 disabled:opacity-40"
            >
              <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
