'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email);
    router.replace('/');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
        <p className="text-xs text-gray-500 mt-3">Admins: use the registered admin email.</p>
      </form>
    </div>
  );
}
