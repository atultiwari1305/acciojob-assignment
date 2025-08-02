'use client';
import { useState } from 'react';
import API from '../utils/api';
import { useStore } from '../store/useStore';

export default function ChatPanel() {
  const [prompt, setPrompt] = useState('');
  const { chatHistory, setChatHistory, setCode, selectedSession } = useStore();

  const sendPrompt = async () => {
    const newChat = [...chatHistory, { role: 'user', content: prompt }];
    setChatHistory(newChat);
    setPrompt('');

    const { data } = await API.post('/ai/generate', { prompt });
    const jsx = data.code.match(/<[^>]+>/) ? data.code : `<div>${data.code}</div>`; // naive JSX parse
    const css = data.code.includes('{') ? '' : ''; // simple fallback

    setCode({ jsx, css });
    const updatedHistory = [...newChat, { role: 'ai', content: data.code }];
    setChatHistory(updatedHistory);
    await API.put(`/sessions/${selectedSession}`, { chatHistory: updatedHistory, jsxCode: jsx, cssCode: css });
  };

  return (
    <div className="w-1/3 p-4 border-r h-screen flex flex-col">
      <div className="flex-1 overflow-auto space-y-2">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <b>{msg.role === 'user' ? 'You' : 'AI'}:</b> {msg.content}
          </div>
        ))}
      </div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="border mt-2 p-2" rows={4} />
      <button onClick={sendPrompt} className="bg-blue-500 text-white p-2 mt-2 rounded">Send</button>
    </div>
  );
}
