'use client';
import { useSneakerContext } from '@/context/SneakerContext';
import { Outfit, OutfitItem } from '@/context/SneakerContext';
import { useCart } from '@/context/CartContext';

export default function OutfitsPage() {
  const { outfits } = useSneakerContext();
  const { addItem } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Outfits</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit: Outfit) => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{outfit.name}</h2>
              <p className="text-gray-600 mb-4">{outfit.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                {outfit.styles.map((style, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {style}
                  </span>
                ))}
                </div>
                {typeof outfit.price === 'number' && (
                  <div className="flex items-center gap-3">
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