'use client';
import { useState } from 'react';
import API from '../utils/api';
import { useRouter } from 'next/navigation'; // ✅ Updated import
import { useStore } from '../store/useStore';

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ Now works with App Router
  const { setToken, setUserId } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const { data } = await API.post(`/auth/${endpoint}`, { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUserId(data.userId);
      router.push('/'); // ✅ Works fine with next/navigation
    } catch (err) {
      alert(err.response?.data?.msg || 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Signup'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {isLogin ? 'Login' : 'Signup'}
      </button>
    </form>
  );
}
