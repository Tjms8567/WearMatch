'use client';
import AdminGate from '@/components/AdminGate';
import { useContentContext } from '@/context/ContentContext';
import { useState } from 'react';

export default function AdminSocialPage() {
  const { social, addSocial, removeSocial, tokens, setTokens } = useContentContext();
  const [item, setItem] = useState({ type: 'youtube', url: '', title: '', thumb: '' });
  const [tks, setTks] = useState({ facebook: tokens.facebook || '', instagram: tokens.instagram || '', youtube: tokens.youtube || '' });

  const onAdd = () => {
    if (!item.url) return alert('URL is required');
    addSocial({ id: `social_${Date.now()}`, ...item } as any);
    setItem({ type: 'youtube', url: '', title: '', thumb: '' });
  };

  const onSaveTokens = () => {
    setTokens(tks);
    alert('Tokens saved');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <h1 className="text-2xl font-bold mb-4">Social Connections</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Add Social Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select className="border rounded px-3 py-2" value={item.type} onChange={(e)=>setItem({...item, type: e.target.value})}>
                <option value="facebook">Facebook Post</option>
                <option value="instagram">Instagram Post/Reel</option>
                <option value="youtube">YouTube Video</option>
              </select>
              <input className="border rounded px-3 py-2" placeholder="URL" value={item.url} onChange={(e)=>setItem({...item, url: e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Title (optional)" value={item.title} onChange={(e)=>setItem({...item, title: e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Thumbnail (optional)" value={item.thumb} onChange={(e)=>setItem({...item, thumb: e.target.value})} />
            </div>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAdd}>Add</button>
            <div className="mt-4 space-y-2">
              {social.map((s)=> (
                <div key={s.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="text-sm">{s.type}: {s.title || s.url}</div>
                  <button className="text-red-600 hover:underline" onClick={()=>removeSocial(s.id)}>Remove</button>
                </div>
              ))}
              {social.length === 0 && <p className="text-gray-600">No social items yet.</p>}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Tokens (optional)</h2>
            <div className="grid grid-cols-1 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Facebook token" value={tks.facebook} onChange={(e)=>setTks({...tks, facebook: e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Instagram token" value={tks.instagram} onChange={(e)=>setTks({...tks, instagram: e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="YouTube API key" value={tks.youtube} onChange={(e)=>setTks({...tks, youtube: e.target.value})} />
              <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={onSaveTokens}>Save Tokens</button>
            </div>
            <p className="text-xs text-gray-500 mt-2">In a real production app, tokens should be stored securely on the server.</p>
          </div>
        </div>
      </AdminGate>
    </div>
  );
}
