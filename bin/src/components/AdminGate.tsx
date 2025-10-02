'use client';
import React, { useMemo, useState } from 'react';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const expected = useMemo(() => process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '', []);
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('wearmatch_admin_ok') === '1';
    
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && input === expected) {
      setAuthed(true);
      if (typeof window !== 'undefined') localStorage.setItem('wearmatch_admin_ok', '1');
    } else {
      alert('Invalid admin password');
    }
  };

  const onSignOut = () => {
    setAuthed(false);
    if (typeof window !== 'undefined') localStorage.removeItem('wearmatch_admin_ok');
  };

  // If already authed via secret manage link, allow access regardless of expected
  if (authed) {
    return (
      <div>
        <div className="mb-4 flex justify-end">
          <button onClick={onSignOut} className="text-sm text-gray-600 hover:underline">Sign out</button>
        </div>
        {children}
      </div>
    );
  }

  if (!expected) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded">
        <p className="mb-2 font-semibold">Admin password is not set.</p>
        <p className="text-sm text-gray-600">Define NEXT_PUBLIC_ADMIN_PASSWORD in your Vercel environment variables.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
    </form>
  );
}
