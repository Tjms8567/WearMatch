'use client';
import { useState } from 'react';
import { useMessages } from '@/context/MessagesContext';

export default function ContactPage() {
  const { addMessage } = useMessages();
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.body) return;
    addMessage({ name: form.name, email: form.email, subject: form.subject, body: form.body });
    setSent(true);
    setForm({ name: '', email: '', subject: '', body: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {sent && <div className="mb-4 p-3 rounded bg-green-50 text-green-700">Thanks! We'll get back to you soon.</div>}
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Your name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <input type="email" className="border rounded px-3 py-2 w-full" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input className="border rounded px-3 py-2 w-full" placeholder="Subject" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} required />
        <textarea className="border rounded px-3 py-2 w-full" rows={5} placeholder="Message" value={form.body} onChange={(e)=>setForm({...form,body:e.target.value})} required />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
