'use client';
import AdminGate from '@/components/AdminGate';
import { useContentContext } from '@/context/ContentContext';
import { useState } from 'react';

export default function AdminContentPage() {
  const { slides, addSlide, removeSlide, designs, addDesign, removeDesign, exportContent, palettes, addPalette, removePalette } = useContentContext();
  const [palette, setPalette] = useState({ name: '', colors: '' });
  const [slide, setSlide] = useState({ image: '', title: '', subtitle: '', ctaText: '', ctaHref: '' });
  const [designName, setDesignName] = useState('');
  const [designSvg, setDesignSvg] = useState('');

  const onAddSlide = () => {
    if (!slide.image) return alert('Slide image is required');
    addSlide({ id: `slide_${Date.now()}`, ...slide });
    setSlide({ image: '', title: '', subtitle: '', ctaText: '', ctaHref: '' });
  };
  const onAddDesign = () => {
    if (!designName || !designSvg) return alert('Design name and SVG are required');
    addDesign({ id: `design_${Date.now()}`, name: designName, svg: designSvg });
    setDesignName('');
    setDesignSvg('');
  };

  const onExport = () => {
    const data = exportContent();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onAddPalette = () => {
    if (!palette.name || !palette.colors) return alert('Name and colors required');
    const colors = palette.colors.split(',').map(c => c.trim()).filter(Boolean);
    addPalette({ id: `pal_${Date.now()}`, name: palette.name, colors });
    setPalette({ name: '', colors: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <h1 className="text-2xl font-bold mb-6">Manage Hero Slides & Designs</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Hero Slides</h2>
            <div className="space-y-2">
              {slides.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-3">
                    <img src={s.image} alt={s.title || s.id} className="w-16 h-10 object-cover rounded" />
                    <div className="text-sm">
                      <div className="font-medium">{s.title || 'Untitled'}</div>
                      <div className="text-gray-600">{s.subtitle}</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline" onClick={() => removeSlide(s.id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Image URL" value={slide.image} onChange={(e) => setSlide({ ...slide, image: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Title" value={slide.title} onChange={(e) => setSlide({ ...slide, title: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Subtitle" value={slide.subtitle} onChange={(e) => setSlide({ ...slide, subtitle: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="CTA Text" value={slide.ctaText} onChange={(e) => setSlide({ ...slide, ctaText: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="CTA Href" value={slide.ctaHref} onChange={(e) => setSlide({ ...slide, ctaHref: e.target.value })} />
            </div>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAddSlide}>Add Slide</button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Text/SVG Designs</h2>
            <div className="space-y-2">
              {designs.map((d) => (
                <div key={d.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-10 bg-white flex items-center justify-center border rounded" dangerouslySetInnerHTML={{ __html: d.svg }} />
                    <div className="text-sm">
                      <div className="font-medium">{d.name}</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline" onClick={() => removeDesign(d.id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input className="border rounded px-3 py-2 w-full mb-2" placeholder="Design name" value={designName} onChange={(e) => setDesignName(e.target.value)} />
              <textarea className="border rounded px-3 py-2 w-full" placeholder="SVG code" rows={4} value={designSvg} onChange={(e) => setDesignSvg(e.target.value)} />
            </div>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAddDesign}>Add Design</button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Color Palettes</h2>
            <div className="space-y-2">
              {palettes.map((p) => (
                <div key={p.id} className="bg-gray-50 p-2 rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.name}</div>
                    <button className="text-red-600 hover:underline" onClick={()=>removePalette(p.id)}>Delete</button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {p.colors.map((c, idx)=> (
                      <span key={idx} className="w-5 h-5 rounded-full border" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              ))}
              {palettes.length === 0 && <p className="text-gray-600">No palettes yet.</p>}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Palette name" value={palette.name} onChange={(e)=>setPalette({...palette, name: e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Colors (comma separated)" value={palette.colors} onChange={(e)=>setPalette({...palette, colors: e.target.value})} />
            </div>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={onAddPalette}>Add Palette</button>
          </div>
        </div>
        <div className="mt-6">
          <button onClick={onExport} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Export Content JSON</button>
        </div>
      </AdminGate>
    </div>
  );
}
