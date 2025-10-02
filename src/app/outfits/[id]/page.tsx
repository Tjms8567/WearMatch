'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';
import { Outfit, Sneaker } from '@/context/SneakerContext';
import { findMatchingSneakers } from '@/utils/matchingAlgorithm';

export default function OutfitDetail({ params }: { params: { id: string } }) {
  const { outfits, sneakers } = useSneakerContext();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [matchingSneakers, setMatchingSneakers] = useState<Sneaker[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('All');

  useEffect(() => {
    const foundOutfit = outfits.find(o => o.id === params.id);
    if (foundOutfit) {
      setOutfit(foundOutfit);
      // Find matching sneakers for this outfit
      const matches = findMatchingSneakers(foundOutfit, sneakers);
      setMatchingSneakers(matches);
    }
  }, [outfits, sneakers, params.id]);

  if (!outfit) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  const filteredSneakers = selectedStyle === 'All' 
    ? matchingSneakers 
    : matchingSneakers.filter(sneaker => sneaker.styles.includes(selectedStyle));

  const uniqueStylesSet = new Set(outfit.styles);
  const uniqueStyles = ['All', ...Array.from(uniqueStylesSet)];

  return (
    <div className="container mx-auto p-4">
      <Link href="/outfits" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to all outfits
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={outfit.image} 
            alt={outfit.name} 
            className="w-full h-64 object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{outfit.name}</h1>
          <p className="text-gray-700 mb-4">{outfit.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Styles:</h3>
            <div className="flex flex-wrap gap-2">
              {outfit.styles.map((style, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {style}
                </span>
              ))}
            </div>
          </div>

          {outfit.items && outfit.items.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Outfit Items:</h3>
              <div className="space-y-2">
                {outfit.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="font-medium capitalize">{item.type}:</span>
                    <span className="text-gray-600">{item.name}</span>
                    <span className="text-sm text-gray-500">({item.color})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Matching Sneakers</h2>
        
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
        
        {filteredSneakers.length === 0 ? (
          <p className="text-gray-500">No matching sneakers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSneakers.map((sneaker) => (
              <Link key={sneaker.id} href={`/sneakers/${sneaker.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={sneaker.image} 
                      alt={`${sneaker.brand} ${sneaker.model}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{sneaker.brand} {sneaker.model}</h3>
                    <p className="text-gray-600 mb-2">{sneaker.colorway}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${sneaker.price}</span>
                      <span className="text-sm text-gray-500">{sneaker.releaseYear}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}