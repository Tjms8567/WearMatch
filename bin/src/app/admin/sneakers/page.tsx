'use client';
import { useSneakerContext, Sneaker } from '@/context/SneakerContext';
import AdminGate from '@/components/AdminGate';
import { useMemo, useState } from 'react';

export default function AdminSneakersPage() {
  const { sneakers, addSneaker, removeSneaker, exportData } = useSneakerContext();
  const [form, setForm] = useState<Partial<Sneaker>>({ brand: '', model: '', colorway: '', price: 0, releaseYear: new Date().getFullYear(), image: '', colors: { primary: '', secondary: '', accent: '' }, styles: [], description: '' });

  const nextId = useMemo(() => {
    const maxId = sneakers.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0);
    return String(maxId + 1);
  }, [sneakers]);

  const onAdd = () => {
    if (!form.brand || !form.model || !form.image) {
      alert('Brand, model, and image are required');
      return;
    }
    const s: Sneaker = {
      id: nextId,
      brand: form.brand!,
      model: form.model!,
      colorway: form.colorway || '',
      price: Number(form.price) || 0,
      releaseYear: Number(form.releaseYear) || new Date().getFullYear(),
      image: form.image!,
      colors: form.colors || { primary: '', secondary: '', accent: '' },
      styles: form.styles || [],
      description: form.description || '',
    };
    addSneaker(s);
    setForm({ brand: '', model: '', colorway: '', price: 0, releaseYear: new Date().getFullYear(), image: '', colors: { primary: '', secondary: '', accent: '' }, styles: [], description: '' });
  };

  const onExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data.sneakers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sneakers.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <h1 className="text-2xl font-bold mb-4">Manage Sneakers</h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Add New Sneaker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Brand" value={form.brand || ''} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Model" value={form.model || ''} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Colorway" value={form.colorway || ''} onChange={(e) => setForm({ ...form, colorway: e.target.value })} />
            <input className="border rounded px-3 py-2" type="number" placeholder="Price" value={Number(form.price) || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            <input className="border rounded px-3 py-2" type="number" placeholder="Release Year" value={Number(form.releaseYear) || new Date().getFullYear()} onChange={(e) => setForm({ ...form, releaseYear: Number(e.target.value) })} />
            <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <input className="border rounded px-3 py-2" placeholder="Primary color (hex or name)" value={form.colors?.primary || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), primary: e.target.value } })} />
            <input className="border rounded px-3 py-2" placeholder="Secondary color" value={form.colors?.secondary || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), secondary: e.target.value } })} />
            <input className="border rounded px-3 py-2" placeholder="Accent color" value={form.colors?.accent || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), accent: e.target.value } })} />
          </div>
          <textarea className="w-full border rounded px-3 py-2 mt-3" placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAdd}>Add Sneaker</button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Existing Sneakers ({sneakers.length})</h2>
          <button onClick={onExport} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Export JSON</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sneakers.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center gap-3">
                <img src={s.image} alt={s.model} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">{s.brand} {s.model}</div>
                  <div className="text-sm text-gray-600">${s.price} · {s.releaseYear}</div>
                </div>
              </div>
              <button className="mt-3 text-red-600 hover:underline" onClick={() => removeSneaker(s.id)}>Delete</button>
            </div>
          ))}
        </div>
      </AdminGate>
    </div>
  );
}
