'use client';
import { useSneakerContext, Outfit } from '@/context/SneakerContext';
import AdminGate from '@/components/AdminGate';
import { useMemo, useState } from 'react';

export default function AdminOutfitsPage() {
  const { outfits, addOutfit, removeOutfit, exportData } = useSneakerContext();
  const [form, setForm] = useState<Partial<Outfit>>({ name: '', image: '', price: 0, colors: { primary: '', secondary: '', accent: '' }, styles: [], items: [], sizes: ['S','M','L','XL'], description: '' });

  const nextId = useMemo(() => {
    const ids = outfits.map(o => o.id);
    let i = outfits.length + 1;
    let candidate = `outfit${i}`;
    while (ids.includes(candidate)) {
      i += 1;
      candidate = `outfit${i}`;
    }
    return candidate;
  }, [outfits]);

  const onAdd = () => {
    if (!form.name || !form.image) {
      alert('Name and image are required');
      return;
    }
    const o: Outfit = {
      id: nextId,
      name: form.name!,
      image: form.image!,
      price: Number(form.price) || 0,
      colors: form.colors || { primary: '', secondary: '', accent: '' },
      styles: form.styles || [],
      items: form.items || [],
      sizes: form.sizes || ['S','M','L','XL'],
      description: form.description || '',
    } as Outfit;
    addOutfit(o);
    setForm({ name: '', image: '', price: 0, colors: { primary: '', secondary: '', accent: '' }, styles: [], items: [], description: '' });
  };

  const onExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data.outfits, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'outfits.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <h1 className="text-2xl font-bold mb-4">Manage Outfits</h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Add New Outfit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input className="border rounded px-3 py-2" type="number" placeholder="Price" value={Number(form.price) || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
            <input className="border rounded px-3 py-2 w-full" placeholder="e.g. XS,S,M,L,XL" value={(form.sizes || []).join(',')} onChange={(e)=> setForm({ ...form, sizes: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <input className="border rounded px-3 py-2" placeholder="Primary color" value={form.colors?.primary || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), primary: e.target.value } })} />
            <input className="border rounded px-3 py-2" placeholder="Secondary color" value={form.colors?.secondary || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), secondary: e.target.value } })} />
            <input className="border rounded px-3 py-2" placeholder="Accent color" value={form.colors?.accent || ''} onChange={(e) => setForm({ ...form, colors: { ...(form.colors || { primary: '', secondary: '', accent: '' }), accent: e.target.value } })} />
          </div>
          <textarea className="w-full border rounded px-3 py-2 mt-3" placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAdd}>Add Outfit</button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Existing Outfits ({outfits.length})</h2>
          <button onClick={onExport} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Export JSON</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outfits.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center gap-3">
                <img src={o.image} alt={o.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-sm text-gray-600">${o.price ?? 0}</div>
                </div>
              </div>
              <button className="mt-3 text-red-600 hover:underline" onClick={() => removeOutfit(o.id)}>Delete</button>
            </div>
          ))}
        </div>
      </AdminGate>
    </div>
  );
}
