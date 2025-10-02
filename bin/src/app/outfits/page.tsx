'use client';
import { useSneakerContext } from '@/context/SneakerContext';
import { Outfit, OutfitItem } from '@/context/SneakerContext';
import { useCart } from '@/context/CartContext';
import { useContentContext } from '@/context/ContentContext';
import { useMemo, useState } from 'react';
import ProductPreview from '@/components/ProductPreview';
import SizeGuide from '@/components/SizeGuide';

export default function OutfitsPage() {
  const { outfits } = useSneakerContext();
  const { addItem } = useCart();
  const { designs } = useContentContext();
  const [selectedColorById, setSelectedColorById] = useState<Record<string, string>>({});
  const [selectedDesignById, setSelectedDesignById] = useState<Record<string, string>>({});
  const [selectedSizeById, setSelectedSizeById] = useState<Record<string, string>>({});
  const [openGuide, setOpenGuide] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Outfits</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit: Outfit) => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{outfit.name}</h2>
              <p className="text-gray-600 mb-4">{outfit.description}</p>
              {(() => {
                const chosenColor = selectedColorById[outfit.id] || outfit.colors.primary;
                const chosenDesign = designs.find(d => d.id === selectedDesignById[outfit.id]) || designs[0];
                return (
                  <ProductPreview imageUrl={outfit.image} overlayColor={chosenColor} designSvg={chosenDesign?.svg} grayscale={false} height={192} />
                );
              })()}
              {/* Color palette from outfit colors + matching algorithm choices */}
              <div className="flex items-center gap-2 mb-4">
                {['primary','secondary','accent'].map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs capitalize text-gray-500 w-16">{key}</span>
                    <button
                      aria-label={`Select ${key} color`}
                      className={`w-7 h-7 rounded-full border ${selectedColorById[outfit.id] === (outfit.colors as any)[key] ? 'ring-2 ring-blue-500' : ''}`}
                      style={{ background: (outfit.colors as any)[key] }}
                      onClick={() => setSelectedColorById(prev => ({ ...prev, [outfit.id]: (outfit.colors as any)[key] }))}
                    />
                  </div>
                ))}
              </div>
              {/* Design selection bar */}
              {designs.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Designs</h3>
                  <div className="flex gap-2 overflow-auto">
                    {designs.map((d) => (
                      <button
                        key={d.id}
                        className={`min-w-[130px] h-12 bg-white border rounded flex items-center justify-center px-2 ${selectedDesignById[outfit.id] === d.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setSelectedDesignById(prev => ({ ...prev, [outfit.id]: d.id }))}
                        dangerouslySetInnerHTML={{ __html: d.svg }}
                        aria-label={`Select design ${d.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}
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
                        selectedColor: selectedColorById[outfit.id] || outfit.colors.primary,
                        selectedDesignId: selectedDesignById[outfit.id] || designs[0]?.id,
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