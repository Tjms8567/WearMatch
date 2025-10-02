'use client';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';

export default function BrandsPage() {
  const { getAllBrands } = useSneakerContext();
  const brands = getAllBrands();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Brand</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <Link 
            key={index} 
            href={`/brands/${brand}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-bold">{brand}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}