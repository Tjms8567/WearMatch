'use client';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';

export default function BrandsList() {
  const { getAllBrands } = useSneakerContext();
  const brands = getAllBrands();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brand, index) => (
        <Link 
          key={index} 
          href={`/brands/${brand.toLowerCase()}`}
          className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg text-center transition"
        >
          <h3 className="text-xl font-semibold">{brand}</h3>
        </Link>
      ))}
    </div>
  );
}