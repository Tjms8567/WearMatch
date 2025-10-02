'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';
import { Sneaker, Outfit } from '@/context/SneakerContext';
import { useCart } from '@/context/CartContext';

export default function SneakerDetail({ params }: { params: { id: string } }) {
  const { sneakers, getMatchingOutfits } = useSneakerContext();
  const { addItem } = useCart();
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const [matchingOutfits, setMatchingOutfits] = useState<Outfit[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('All');
  const relatedSneakers = sneakers.filter(s => s.id !== params.id && s.brand === sneaker?.brand).slice(0, 4);
  const [related, setRelated] = useState<Sneaker[]>([]);

  useEffect(() => {
    const foundSneaker = sneakers.find(s => s.id === params.id);
    if (foundSneaker) {
      setSneaker(foundSneaker);
      const outfits = getMatchingOutfits(params.id);
      setMatchingOutfits(outfits);
      // Related sneakers: same brand or overlapping styles
      const others = sneakers.filter(s => s.id !== foundSneaker.id);
      const rel = others.filter(s => s.brand === foundSneaker.brand || s.styles.some(st => foundSneaker.styles.includes(st))).slice(0, 6);
      setRelated(rel);
    }
  }, [sneakers, params.id, getMatchingOutfits]);

  if (!sneaker) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  const filteredOutfits = selectedStyle === 'All' 
    ? matchingOutfits 
    : matchingOutfits.filter(outfit => outfit.styles.includes(selectedStyle));

  // Fix Set iteration error by converting to array first
  const uniqueStylesSet = new Set(sneaker.styles);
  const uniqueStyles = ['All', ...Array.from(uniqueStylesSet)];

  return (
    <div className="container mx-auto p-4">
      <Link href="/sneakers" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to all sneakers
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={sneaker.image} 
            alt={`${sneaker.brand} ${sneaker.model}`} 
            className="w-full h-64 object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{sneaker.brand} {sneaker.model}</h1>
          <p className="text-xl text-gray-600 mb-4">{sneaker.colorway}</p>
          
          <div className="mb-4">
            <span className="text-2xl font-bold">${sneaker.price}</span>
            <span className="text-gray-500 ml-2">Released: {sneaker.releaseYear}</span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Styles:</h3>
            <div className="flex flex-wrap gap-2">
              {sneaker.styles.map((style, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {style}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-gray-700">{sneaker.description}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Matching Outfits</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Filter by style:</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueStyles.map((style, index) => (
              <button
                key={index}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedStyle === style 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        
        {filteredOutfits.length === 0 ? (
          <p className="text-gray-500">No matching outfits found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.map((outfit) => (
              <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={outfit.image} 
                    alt={outfit.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{outfit.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{outfit.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {outfit.styles.map((style, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {style}
                      </span>
                    ))}
                  </div>
                  {typeof outfit.price === 'number' && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold">${'{'}outfit.price{'}'}</span>
                      <button
                        onClick={() => addItem({
                          id: outfit.id,
                          type: 'outfit',
                          name: outfit.name,
                          image: outfit.image,
                          price: outfit.price ?? 0,
                        })}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {relatedSneakers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Sneakers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedSneakers.map((s) => (
              <Link key={s.id} href={`/sneakers/${s.id}`} className="bg-white rounded-lg shadow p-3 block">
                <img src={s.image} alt={s.model} className="w-full h-40 object-cover rounded" />
                <div className="mt-2 font-semibold">{s.brand} {s.model}</div>
                <div className="text-sm text-gray-600">${'{'}s.price{'}'}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(r => (
              <Link key={r.id} href={`/sneakers/${r.id}`} className="block bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
                <img src={r.image} alt={`${r.brand} ${r.model}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{r.brand} {r.model}</div>
                  <div className="text-sm text-gray-600">{r.colorway}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}