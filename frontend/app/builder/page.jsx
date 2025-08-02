'use client';

import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import API from '../../utils/api';
import ChatPanel from '../../components/ChatPanel';
import CodeTabs from '../../components/CodeTabs';
import ComponentPreview from '../../components/ComponentPreview';

export default function Builder() {
  const { selectedSession, setCode } = useStore();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get(`/sessions/${selectedSession}`);
      setCode({ jsx: data.jsxCode, css: data.cssCode });
    };
    if (selectedSession) fetch();
  }, [selectedSession]);

  return (
    <div className="flex">
      <ChatPanel />
      <div className="w-2/3 flex flex-col h-screen">
        <ComponentPreview />
        <CodeTabs />
      </div>
    </div>
  );
}
