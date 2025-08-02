import create from 'zustand';

export const useStore = create((set) => ({
  token: null,
  userId: null,
  sessions: [],
  selectedSession: null,
  chatHistory: [],
  code: { jsx: '', css: '' },
  setToken: (token) => set({ token }),
  setUserId: (id) => set({ userId: id }),
  setSessions: (sessions) => set({ sessions }),
  setSelectedSession: (session) => set({ selectedSession: session }),
  setChatHistory: (history) => set({ chatHistory: history }),
  setCode: (code) => set({ code }),
}));
