'use client';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';
import SneakerCard from '@/components/SneakerCard';

export default function BrandPage({ params }: { params: { brand: string } }) {
  const { sneakers } = useSneakerContext();
  const brandParam = params.brand.toLowerCase();
  const brandSneakers = sneakers.filter(s => s.brand.toLowerCase() === brandParam);
  
  return (
    <div className="container mx-auto p-8">
      <Link href="/brands" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to all brands
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">{params.brand} Sneakers</h1>
      
      {brandSneakers.length === 0 ? (
        <p className="text-gray-500">No sneakers found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandSneakers.map((sneaker) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </div>
      )}
    </div>
  );
}