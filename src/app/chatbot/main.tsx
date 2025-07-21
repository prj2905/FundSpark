'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [query, setQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://chatbot-2-8e2a.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setChatHistory([...chatHistory, { user: query, bot: data.response }]);
      setQuery('');
    } catch (err) {
      console.error('Chatbot error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg border">
      <h2 className="text-xl font-bold mb-4">💬 Ask our Crowdfunding Chatbot</h2>

      <div className="h-64 overflow-y-auto border rounded-md p-3 mb-4 bg-gray-50 text-sm">
        {chatHistory.map((entry, idx) => (
          <div key={idx}>
            <p className="text-blue-600 font-semibold">You:</p>
            <p className="mb-2">{entry.user}</p>
            <p className="text-green-700 font-semibold">Bot:</p>
            <p className="mb-4">{entry.bot}</p>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">Thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something like 'How do I start a campaign?'"
          className="flex-grow p-2 border rounded-md"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
