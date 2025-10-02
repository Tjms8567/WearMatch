'use client';
import { useRef, useState } from 'react';
import ProductPreview from '@/components/ProductPreview';
import { useSneakerContext, Sneaker, Outfit } from '@/context/SneakerContext';
import { findMatchingOutfits } from '@/utils/matchingAlgorithm';

type Extracted = { hex: string };

export default function StyleLens() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [colors, setColors] = useState<Extracted[]>([]);
  const { outfits, sneakers } = useSneakerContext();
  const [matches, setMatches] = useState<Outfit[]>([]);
  const [suggestedSneakers, setSuggestedSneakers] = useState<Sneaker[]>([]);

  const onPick = () => fileRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = canvasRef.current || document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const w = 64, h = 64;
      c.width = w; c.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const map = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4 * 4) { // sample roughly 1/4 pixels
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const hex = toHex(r, g, b);
        const key = bucketize(hex);
        map.set(key, (map.get(key) || 0) + 1);
      }
      const top = Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([hex]) => ({ hex }));
      setColors(top);
      computeMatches(top);
    };
  };

  const computeMatches = (top: Extracted[]) => {
    const [p, s, a] = [top[0]?.hex || '#ffffff', top[1]?.hex || '#cccccc', top[2]?.hex || '#999999'];
    const virtualSneaker: Sneaker = {
      id: 'lens', brand: 'Lens', model: 'Upload', colorway: 'Lens', price: 0, releaseYear: 0,
      image: imageUrl || '',
      colors: { primary: p, secondary: s, accent: a },
      styles: [],
      description: 'Virtual',
    };
    const matched = findMatchingOutfits(virtualSneaker, outfits).slice(0, 9);
    setMatches(matched);
    const fams = new Set(top.map(t => normalizeFamily(t.hex)));
    const sn = sneakers.filter(sn => [sn.colors.primary, sn.colors.secondary, sn.colors.accent].some(c => fams.has(normalizeFamily(c)))).slice(0, 9);
    setSuggestedSneakers(sn);
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Style Lens</h2>
        <button onClick={onPick} className="bg-primary text-white px-4 py-2 rounded">Upload a look</button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      {imageUrl && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Your Image</h3>
            <ProductPreview imageUrl={imageUrl} height={256} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Detected Colors</h3>
            <div className="flex items-center gap-3">
              {colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full border" style={{ background: c.hex }} />
                  <span className="text-sm text-gray-700">{c.hex}</span>
                </div>
              ))}
              {!colors.length && <p className="text-gray-600">Analyzing...</p>}
            </div>
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Suggested Outfits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((o) => (
              <div key={o.id} className="bg-white rounded shadow overflow-hidden">
                <ProductPreview imageUrl={o.image} overlayColor={o.colors.primary} height={192} />
                <div className="p-3">
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-sm text-gray-600">{o.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestedSneakers.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Suggested Sneakers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedSneakers.map((s) => (
              <div key={s.id} className="bg-white rounded shadow overflow-hidden">
                <ProductPreview imageUrl={s.image} overlayColor={s.colors.primary} height={192} />
                <div className="p-3">
                  <div className="font-semibold">{s.brand} {s.model}</div>
                  <div className="text-sm text-gray-600">{s.colorway}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function toHex(r: number, g: number, b: number) {
  const h = (n: number) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`.toLowerCase();
}

function normalizeFamily(value: string) {
  const v = value.toLowerCase();
  const map: Record<string, string> = {
    '#000000': 'black', '#111111': 'black', '#222222': 'black',
    '#ffffff': 'white', '#fefefe': 'white',
    '#ff0000': 'red', '#ce1141': 'red',
    '#0000ff': 'blue', '#000080': 'blue', '#1e3a8a': 'blue',
    '#008000': 'green', '#10b981': 'green',
    '#808080': 'gray', '#6b7280': 'gray',
    '#ffd700': 'yellow', '#f59e0b': 'yellow',
  };
  if (map[v]) return map[v];
  if (v.startsWith('#')) {
    // basic heuristic
    const r = parseInt(v.slice(1, 3), 16);
    const g = parseInt(v.slice(3, 5), 16);
    const b = parseInt(v.slice(5, 7), 16);
    if (r > 200 && g > 200 && b > 200) return 'white';
    if (r < 40 && g < 40 && b < 40) return 'black';
    if (r > g && r > b) return 'red';
    if (g > r && g > b) return 'green';
    if (b > r && b > g) return 'blue';
    return 'gray';
  }
  return v;
}

function bucketize(v: string) {
  // reduce to nearest 16-level per channel to cluster close colors
  if (!v.startsWith('#') || v.length < 7) return v;
  const r = Math.round(parseInt(v.slice(1, 3), 16) / 16) * 16;
  const g = Math.round(parseInt(v.slice(3, 5), 16) / 16) * 16;
  const b = Math.round(parseInt(v.slice(5, 7), 16) / 16) * 16;
  return toHex(r, g, b);
}
