import { useEffect } from 'react';
import API from '../utils/api';
import { useRouter } from 'next/router';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const router = useRouter();
  const { setSessions, setSelectedSession, sessions } = useStore();

  const fetchSessions = async () => {
    const { data } = await API.get('/sessions');
    setSessions(data);
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleSelect = (id) => {
    setSelectedSession(id);
    router.push('/builder');
  };

  const handleNew = async () => {
    const { data } = await API.post('/sessions', { chatHistory: [], jsxCode: '', cssCode: '' });
    setSelectedSession(data._id);
    router.push('/builder');
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Your Sessions</h1>
      <button onClick={handleNew} className="bg-green-600 text-white px-4 py-2 rounded mb-6">
        + New Session
      </button>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s._id} className="border p-4 rounded hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(s._id)}>
            Session from {new Date(s.createdAt).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}
