'use client';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { downloadZip } from '../utils/downloadZip';

export default function CodeTabs() {
  const { code } = useStore();
  const [tab, setTab] = useState('jsx');

  const copy = async () => {
    const text = tab === 'jsx' ? code.jsx : code.css;
    await navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <div className="p-4 flex-1 overflow-auto">
      <div className="flex space-x-4 mb-2">
        <button onClick={() => setTab('jsx')} className={`px-3 py-1 ${tab === 'jsx' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>JSX</button>
        <button onClick={() => setTab('css')} className={`px-3 py-1 ${tab === 'css' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>CSS</button>
        <button onClick={copy} className="ml-auto bg-yellow-400 px-3 py-1">Copy</button>
        <button onClick={() => downloadZip(code.jsx, code.css)} className="bg-green-500 px-3 py-1 text-white">Download ZIP</button>
      </div>
      <SyntaxHighlighter language={tab}>
        {tab === 'jsx' ? code.jsx : code.css}
      </SyntaxHighlighter>
    </div>
  );
}
