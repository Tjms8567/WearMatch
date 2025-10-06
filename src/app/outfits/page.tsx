'use client';
import { useSneakerContext } from '@/context/SneakerContext';
import { Outfit, OutfitItem } from '@/context/SneakerContext';

export default function OutfitsPage() {
  const { outfits } = useSneakerContext();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Outfits</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit: Outfit) => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{outfit.name}</h2>
              <p className="text-gray-600 mb-4">{outfit.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {outfit.styles.map((style, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {style}
                  </span>
                ))}
              </div>
              {outfit.items && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="list-disc pl-5">
                    {outfit.items.map((item: OutfitItem, index) => (
                      <li key={index} className="text-gray-600">
                        {item.type}: {item.name} ({item.color})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}