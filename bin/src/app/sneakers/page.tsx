'use client';

import { useSneakerContext } from '@/context/SneakerContext';
import SneakerCard from '@/components/SneakerCard';
import { useState } from 'react';

export default function SneakersPage() {
  const { filteredSneakers, getAllBrands, filterSneakersByBrand } = useSneakerContext();
  const [selectedStyle, setSelectedStyle] = useState('all');
  const brands = getAllBrands();
  const styles = ['all', 'casual', 'streetwear', 'retro', 'classic', 'sporty'];

  // Filter sneakers by style
  const filteredByStyle = selectedStyle === 'all' 
    ? filteredSneakers 
    : filteredSneakers.filter(sneaker => sneaker.styles.includes(selectedStyle));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Sneakers</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Brands</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="all-brands" 
                    name="brand" 
                    className="mr-2"
                    onChange={() => filterSneakersByBrand('')}
                    defaultChecked
                  />
                  <label htmlFor="all-brands">All Brands</label>
                </div>
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`brand-${index}`} 
                      name="brand" 
                      className="mr-2"
                      onChange={() => filterSneakersByBrand(brand)}
                    />
                    <label htmlFor={`brand-${index}`}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Styles</h3>
              <div className="space-y-2">
                {styles.map((style, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`style-${index}`} 
                      name="style" 
                      className="mr-2"
                      onChange={() => setSelectedStyle(style)}
                      defaultChecked={style === 'all'}
                    />
                    <label htmlFor={`style-${index}`} className="capitalize">
                      {style === 'all' ? 'All Styles' : style}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredByStyle.map(sneaker => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
          
          {filteredByStyle.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No sneakers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}